from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import logging
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Database Connection ---
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client.ticketvisor_db  # The database name
tickets_collection = db.tickets  # The collection name

try:
    SUMMARIZER_MODEL_PATH = os.getenv("SUMMARIZER_MODEL", "facebook/bart-large-cnn")
    CLASSIFIER_MODEL_PATH = os.getenv("CLASSIFIER_MODEL", "facebook/bart-large-mnli")

    logger.info(f"Loading summarization model: {SUMMARIZER_MODEL_PATH}...")
    summarizer = pipeline("summarization", model=SUMMARIZER_MODEL_PATH)
    logger.info("Summarization model loaded successfully.")

    logger.info(f"Loading classification model: {CLASSIFIER_MODEL_PATH}...")
    classifier = pipeline("zero-shot-classification", model=CLASSIFIER_MODEL_PATH)
    logger.info("Classification model loaded successfully.")

except Exception as e:
    logger.error(f"Fatal error during AI model loading: {e}", exc_info=True)
    summarizer = None
    classifier = None

app = FastAPI()

origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # All
    allow_headers=["*"],  # All
)


class TicketData(BaseModel):
    text: str
    candidate_labels: list[str]


# --- Pydantic Models for Data Validation ---
class ProcessTicketRequest(BaseModel):
    text: str
    candidate_labels: list[str]


# This model represents a ticket stored in the database
class TicketRecord(BaseModel):
    id: str = Field(alias="_id")
    original_text: str
    summary: str
    category: str
    processed_at: datetime

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


@app.get("/")
def read_root():
    return {"status": "AI Ticket Assistant API is running"}


@app.post("/process-ticket", response_model=TicketRecord)
async def process_ticket(ticket: ProcessTicketRequest):
    if not summarizer or not classifier:
        raise HTTPException(status_code=503, detail="AI models are not available.")

    try:
        summary_output = summarizer(
            ticket.text, max_length=60, min_length=15, do_sample=False
        )
        summary = summary_output[0]["summary_text"]

        classification_output = classifier(
            ticket.text, candidate_labels=ticket.candidate_labels
        )
        category = classification_output["labels"][0]

        # --- SAVE TO DATABASE ---
        ticket_document = {
            "original_text": ticket.text,
            "summary": summary,
            "category": category,
            "processed_at": datetime.utcnow(),
        }
        result = tickets_collection.insert_one(ticket_document)

        # Return the newly created document from the DB
        created_ticket = tickets_collection.find_one({"_id": result.inserted_id})
        created_ticket["_id"] = str(
            created_ticket["_id"]
        )  # Convert ObjectId to string for JSON
        return created_ticket

    except Exception as e:
        logger.error(f"Error processing ticket: {e}", exc_info=True)
        raise HTTPException(
            status_code=500, detail="An error occurred while processing the ticket."
        )


@app.get("/history", response_model=list[TicketRecord])
async def get_history():
    try:
        tickets = []
        for ticket in tickets_collection.find().sort("processed_at", -1).limit(50):
            ticket["_id"] = str(ticket["_id"])
            tickets.append(ticket)
        return tickets
    except Exception as e:
        logger.error(f"Error fetching history: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch ticket history.")

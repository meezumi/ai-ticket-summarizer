from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import logging
import os
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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


@app.get("/")
def read_root():
    return {"status": "AI Ticket Assistant API is running"}


@app.post("/process-ticket")
async def process_ticket(ticket: TicketData):
    if not summarizer or not classifier:
        raise HTTPException(status_code=503, detail="AI models are not available.")

    try:
        logger.info("Generating summary...")
        summary_output = summarizer(
            ticket.text, max_length=60, min_length=15, do_sample=False
        )
        summary = summary_output[0]["summary_text"]

        logger.info(f"Classifying with labels: {ticket.candidate_labels}")
        classification_output = classifier(
            ticket.text, candidate_labels=ticket.candidate_labels
        )
        category = classification_output["labels"][0]

        return {"summary": summary, "category": category}

    except Exception as e:
        logger.error(f"Error processing ticket: {e}", exc_info=True)
        raise HTTPException(
            status_code=500, detail="An error occurred while processing the ticket."
        )

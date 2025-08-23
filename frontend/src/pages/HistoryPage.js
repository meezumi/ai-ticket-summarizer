import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { InboxIcon } from "@heroicons/react/24/outline";

const TicketRow = ({ ticket, index }) => {
  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="grid md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8">
          <p className="text-sm text-gray-400 truncate">
            {ticket.original_text}
          </p>
          <p className="text-md text-white mt-1 font-semibold">
            {ticket.summary}
          </p>
        </div>
        <div className="md:col-span-2">
          <span className="text-sm bg-cyan-900/50 text-cyan-300 font-semibold px-3 py-1 rounded-full">
            {ticket.category}
          </span>
        </div>
        <div className="md:col-span-2 text-right">
          <p className="text-xs text-gray-500">
            {new Date(ticket.processed_at).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/history");
        setHistory(response.data);
      } catch (err) {
        setError("Failed to fetch ticket history.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-900 text-white min-h-screen font-sans"
    >
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
            Processing History
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            A log of the 50 most recently processed tickets.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {isLoading && <p>Loading history...</p>}
          {error && <p className="text-red-400 text-center">{error}</p>}
          {!isLoading &&
            !error &&
            (history.length > 0 ? (
              <div>
                {history.map((ticket, index) => (
                  <TicketRow key={ticket.id} ticket={ticket} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-16">
                <InboxIcon className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">
                  No tickets processed yet.
                </h3>
                <p>Go to the Analyzer to process your first ticket!</p>
              </div>
            ))}
        </main>
      </div>
    </motion.div>
  );
};

export default HistoryPage;

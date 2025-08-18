import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // We'll use this for some base styles

function App() {
  const [ticketText, setTicketText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // These are the categories our AI will choose from.
  const CANDIDATE_LABELS = [
    "Billing",
    "Technical Support",
    "Feature Request",
    "Bug Report",
    "Account Management",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticketText.trim()) {
      setError("Ticket text cannot be empty.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError("");

    try {
      // The API endpoint is on port 8000. Docker Compose networking handles the rest.
      const response = await axios.post(
        "http://localhost:8000/process-ticket",
        {
          text: ticketText,
          candidate_labels: CANDIDATE_LABELS,
        }
      );
      setResult(response.data);
    } catch (err) {
      console.error("Error processing ticket:", err);
      setError("Failed to process the ticket. The AI service might be down.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
            AI Support Ticket Assistant
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            Instantly summarize and categorize customer support tickets.
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          {/* Ticket Input Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
          >
            <label
              htmlFor="ticket-text"
              className="block text-lg font-semibold mb-2 text-gray-300"
            >
              Paste Customer Ticket Text Below:
            </label>
            <textarea
              id="ticket-text"
              rows="10"
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
              placeholder="e.g., 'Hello, I'm having trouble logging into my account. I've tried resetting my password but I'm not receiving the email...'"
              value={ticketText}
              onChange={(e) => setTicketText(e.target.value)}
              disabled={isLoading}
            ></textarea>

            {error && <p className="text-red-400 mt-3">{error}</p>}

            <button
              type="submit"
              className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Analyze Ticket"
              )}
            </button>
          </form>

          {/* Results Section */}
          {result && (
            <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">
                Analysis Complete
              </h2>
              <div className="space-y-4">
                {/* Category Result */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-300">
                    Suggested Category:
                  </h3>
                  <p className="text-2xl font-semibold bg-cyan-900/50 text-cyan-300 inline-block px-4 py-2 rounded-md mt-1">
                    {result.category}
                  </p>
                </div>
                {/* Summary Result */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-300">
                    AI-Generated Summary:
                  </h3>
                  <p className="text-gray-200 bg-gray-900 p-4 rounded-md mt-1">
                    {result.summary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

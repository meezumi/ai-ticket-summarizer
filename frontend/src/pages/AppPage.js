import React, { useState } from "react";
import axios from "axios";
import "../App.css"; 
import { motion } from "framer-motion";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Textarea } from "../components/ui/Input";
import AnimatedText from "../components/ui/AnimatedText";
import GradientText from "../components/ui/GradientText";
import BackgroundEffects from "../components/ui/BackgroundEffects";

function AppPage() {
  const [ticketText, setTicketText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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

  const getCategoryColor = (category) => {
    const colors = {
      "Billing": "from-green-500 to-emerald-600",
      "Technical Support": "from-blue-500 to-cyan-600",
      "Feature Request": "from-purple-500 to-indigo-600",
      "Bug Report": "from-red-500 to-pink-600",
      "Account Management": "from-orange-500 to-yellow-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-4 md:p-8"
        >
          {/* Header */}
          <motion.header 
            className="text-center mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedText
              text="AI Support Ticket Assistant"
              className="text-4xl md:text-5xl font-bold mb-4"
            />
            <GradientText className="text-4xl md:text-5xl font-bold mb-4">
              Powered by Intelligence
            </GradientText>
            <motion.p 
              className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Instantly summarize and categorize customer support tickets with advanced AI.
            </motion.p>
          </motion.header>

          <main className="max-w-4xl mx-auto space-y-8">
            {/* Ticket Input Form */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-8" glow={true}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="flex text-lg font-semibold mb-4 text-gray-300 items-center gap-2">
                      <span>Paste Customer Ticket Text Below:</span>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        📝
                      </motion.div>
                    </label>
                    
                    <Textarea
                      rows={12}
                      placeholder="e.g., 'Hello, I'm having trouble logging into my account. I've tried resetting my password but I'm not receiving the email. This is really urgent as I need to access my billing information for an important client meeting tomorrow morning...'"
                      value={ticketText}
                      onChange={(e) => setTicketText(e.target.value)}
                      disabled={isLoading}
                      className="text-base"
                      error={error}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !ticketText.trim()}
                    loading={isLoading}
                    size="lg"
                    className="w-full"
                  >
                    {isLoading ? "Processing with AI..." : "Analyze Ticket"}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Results Section */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8" glow={true} gradient={true}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircleIcon className="h-8 w-8 text-green-400" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-cyan-400">
                      Analysis Complete
                    </h2>
                  </motion.div>
                  
                  <div className="space-y-6">
                    {/* Category Result */}
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        🏷️ Suggested Category:
                      </h3>
                      <motion.div
                        className={`inline-block px-6 py-3 rounded-2xl text-white font-semibold text-xl bg-gradient-to-r ${getCategoryColor(result.category)} shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {result.category}
                      </motion.div>
                    </motion.div>

                    {/* Summary Result */}
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        🤖 AI-Generated Summary:
                      </h3>
                      <Card className="bg-gray-800/95 p-6">
                        <motion.p 
                          className="text-gray-100 leading-relaxed text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                        >
                          {result.summary}
                        </motion.p>
                      </Card>
                    </motion.div>

                    {/* Processing Info */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700"
                    >
                      <span>Processed with BART-Large model</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  💡 Tips for Better Results:
                </h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Include complete customer messages for better context
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Longer tickets (50+ words) produce more accurate summaries
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Clear problem descriptions improve categorization accuracy
                  </li>
                </ul>
              </Card>
            </motion.div>
          </main>
        </motion.div>
      </div>
    </div>
  );
}

export default AppPage;

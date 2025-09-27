import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { InboxIcon, ClockIcon, TagIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import AnimatedText from "../components/ui/AnimatedText";
import GradientText from "../components/ui/GradientText";
import BackgroundEffects from "../components/ui/BackgroundEffects";

const TicketRow = ({ ticket, index }) => {
  const [expanded, setExpanded] = useState(false);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="mb-4"
    >
      <Card hover={true} className="group transition-all duration-300">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <DocumentTextIcon className="h-5 w-5 text-cyan-400" />
              </motion.div>
              <div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(ticket.category)}`}>
                  {ticket.category}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ClockIcon className="h-4 w-4" />
              <span>{new Date(ticket.processed_at).toLocaleString()}</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <p className="text-md text-white font-semibold leading-relaxed group-hover:text-cyan-200 transition-colors duration-300">
              {ticket.summary}
            </p>
          </div>

          {/* Original text preview */}
          <div>
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TagIcon className="h-4 w-4" />
              {expanded ? "Hide" : "Show"} original ticket
            </motion.button>
            
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 p-4 bg-gray-800/95 rounded-xl border border-gray-600/50"
                >
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {ticket.original_text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center py-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="text-center py-16">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <InboxIcon className="h-16 w-16 mx-auto mb-6 text-gray-600" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-4 text-gray-400">
        No tickets processed yet
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Your ticket analysis history will appear here once you start processing tickets.
      </p>
      <Button variant="secondary">
        <a href="/app">Start Analyzing Tickets</a>
      </Button>
    </Card>
  </motion.div>
);

const StatsCard = ({ icon, title, value, color = "text-cyan-400" }) => (
  <Card className="text-center">
    <div className="flex items-center justify-center mb-3">
      <div className={`p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl ${color}`}>
        {icon}
      </div>
    </div>
    <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
    <div className="text-gray-400 text-sm">{title}</div>
  </Card>
);

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

  // Calculate stats
  const stats = {
    total: history.length,
    categories: [...new Set(history.map(ticket => ticket.category))].length,
    today: history.filter(ticket => 
      new Date(ticket.processed_at).toDateString() === new Date().toDateString()
    ).length,
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
              text="Processing History"
              className="text-4xl md:text-5xl font-bold mb-4"
            />
            <GradientText className="text-lg text-gray-400 mt-2">
              Track your AI-powered ticket analysis journey
            </GradientText>
          </motion.header>

          <main className="max-w-6xl mx-auto">
            {/* Stats Cards */}
            {!isLoading && !error && history.length > 0 && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                <StatsCard
                  icon={<DocumentTextIcon className="h-6 w-6" />}
                  title="Total Processed"
                  value={stats.total}
                  color="text-cyan-400"
                />
                <StatsCard
                  icon={<TagIcon className="h-6 w-6" />}
                  title="Categories"
                  value={stats.categories}
                  color="text-purple-400"
                />
                <StatsCard
                  icon={<ClockIcon className="h-6 w-6" />}
                  title="Today"
                  value={stats.today}
                  color="text-green-400"
                />
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isLoading && <LoadingSpinner />}
              
              {error && (
                <Card className="text-center py-8">
                  <p className="text-red-400">{error}</p>
                  <Button 
                    className="mt-4"
                    onClick={() => window.location.reload()}
                    variant="secondary"
                  >
                    Try Again
                  </Button>
                </Card>
              )}
              
              {!isLoading && !error && (
                history.length > 0 ? (
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between mb-6"
                    >
                      <h2 className="text-xl font-semibold text-gray-300">
                        Recent Tickets ({history.length})
                      </h2>
                      <div className="text-sm text-gray-500">
                        Showing last 50 processed tickets
                      </div>
                    </motion.div>
                    
                    {history.map((ticket, index) => (
                      <TicketRow key={ticket.id} ticket={ticket} index={index} />
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )
              )}
            </motion.div>
          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryPage;

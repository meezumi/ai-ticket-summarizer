import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CpuChipIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const FeatureCard = ({ icon, title, children }) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-lg border border-gray-700"
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="flex items-center gap-4 mb-3">
      {icon}
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-400">{children}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Automate Your Support Workflow
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          TicketVisor AI instantly summarizes and categorizes your customer
          support tickets, saving you time and improving efficiency.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/app"
            className="mt-8 inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
          >
            Get Started <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<DocumentTextIcon className="h-8 w-8 text-cyan-400" />}
            title="Instant Summaries"
          >
            Get concise, AI-generated summaries of long and complex support
            tickets in seconds.
          </FeatureCard>
          <FeatureCard
            icon={<TagIcon className="h-8 w-8 text-cyan-400" />}
            title="Smart Categorization"
          >
            Automatically assign relevant categories like "Billing" or "Bug
            Report" to every ticket.
          </FeatureCard>
          <FeatureCard
            icon={<CpuChipIcon className="h-8 w-8 text-cyan-400" />}
            title="Powered by Transformers"
          >
            Leveraging state-of-the-art AI models for highly accurate and
            context-aware analysis.
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CpuChipIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import AnimatedText from "../components/ui/AnimatedText";
import GradientText from "../components/ui/GradientText";
import BackgroundEffects from "../components/ui/BackgroundEffects";

const FeatureCard = ({ icon, title, children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
  >
    <Card hover={true} glow={true} className="h-full group">
      <motion.div 
        className="flex items-center gap-4 mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-all duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
      </motion.div>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">{children}</p>
    </Card>
  </motion.div>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          y: [null, Math.random() * window.innerHeight],
          x: [null, Math.random() * window.innerWidth],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans relative overflow-hidden">
      <BackgroundEffects />
      <FloatingParticles />
      
      {/* Hero Section */}
      <div className="relative pt-20">
        <motion.div 
          className="container mx-auto px-4 py-20 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <AnimatedText
              text="Automate Your Support Workflow"
              className="text-5xl md:text-7xl font-extrabold mb-6"
              delay={0.5}
            />
            <GradientText className="text-5xl md:text-7xl font-extrabold">
              with AI Intelligence
            </GradientText>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              TicketVisor AI instantly summarizes and categorizes your customer
              support tickets, saving you time and improving efficiency with 
              state-of-the-art machine learning models.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10"
          >
            <Link to="/app">
              <Button size="lg" className="group">
                <span className="flex items-center gap-3">
                  Get Started 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRightIcon className="h-6 w-6" />
                  </motion.div>
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {[
              { number: "99%", label: "Accuracy Rate", delay: 0.1 },
              { number: "< 2s", label: "Processing Time", delay: 0.2 },
              { number: "24/7", label: "Availability", delay: 0.3 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <GradientText>Powerful Features</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the future of customer support automation with our cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<DocumentTextIcon className="h-8 w-8 text-cyan-400" />}
              title="Instant Summaries"
              index={0}
            >
              Get concise, AI-generated summaries of long and complex support
              tickets in seconds using advanced transformer models.
            </FeatureCard>
            
            <FeatureCard
              icon={<TagIcon className="h-8 w-8 text-cyan-400" />}
              title="Smart Categorization"
              index={1}
            >
              Automatically assign relevant categories like "Billing" or "Bug
              Report" to every ticket with zero-shot classification.
            </FeatureCard>
            
            <FeatureCard
              icon={<CpuChipIcon className="h-8 w-8 text-cyan-400" />}
              title="Powered by Transformers"
              index={2}
            >
              Leveraging state-of-the-art AI models for highly accurate and
              context-aware analysis with continuous learning.
            </FeatureCard>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="relative py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-4xl mx-auto" glow={true} gradient={true}>
            <div className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Support Team?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of companies already using AI to streamline their customer support operations.
              </p>
              <Link to="/app">
                <Button size="lg" variant="primary">
                  Start Analyzing Tickets
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;

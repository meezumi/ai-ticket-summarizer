import React from 'react';
import { motion } from 'framer-motion';

const GradientText = ({ 
  children, 
  className = "",
  gradient = "from-cyan-400 via-blue-500 to-purple-600"
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.span>
  );
};

export default GradientText;
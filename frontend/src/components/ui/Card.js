import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Card = ({ 
  children, 
  className,
  hover = true,
  glow = false,
  gradient = false,
  ...props 
}) => {
  const baseClasses = "relative bg-gray-800/90 border border-gray-600/50 rounded-2xl p-6 shadow-xl";
  
  const glowClasses = glow ? "ring-1 ring-cyan-500/20 shadow-cyan-500/10" : "";
  
  const gradientClasses = gradient ? "bg-gradient-to-br from-gray-800/95 to-gray-900/95" : "";

  return (
    <motion.div
      className={clsx(
        baseClasses,
        glowClasses,
        gradientClasses,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { 
        y: -3, 
        scale: 1.01,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(34, 211, 238, 0.15)"
      } : {}}
      {...props}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 pointer-events-none"></div>
      )}
      {children}
    </motion.div>
  );
};

export default Card;
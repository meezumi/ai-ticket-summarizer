import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Input = ({
  label,
  error,
  className,
  containerClassName,
  ...props
}) => {
  const baseClasses = "w-full px-4 py-3 bg-gray-800/90 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50";
  
  return (
    <div className={clsx("space-y-2", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <motion.input
        className={clsx(
          baseClasses,
          error && "border-red-500/50 focus:ring-red-500/50",
          className
        )}
        whileFocus={{ scale: 1.01 }}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const Textarea = ({
  label,
  error,
  className,
  containerClassName,
  ...props
}) => {
  const baseClasses = "w-full px-4 py-3 bg-gray-800/90 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none";
  
  return (
    <div className={clsx("space-y-2", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <motion.textarea
        className={clsx(
          baseClasses,
          error && "border-red-500/50 focus:ring-red-500/50",
          className
        )}
        whileFocus={{ scale: 1.01 }}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export { Input, Textarea };
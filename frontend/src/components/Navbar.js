import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 font-sans ${
        scrolled 
          ? 'bg-gray-900/95 border-b border-gray-700/50 shadow-2xl' 
          : 'bg-gray-900/90 border-b border-gray-700/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center gap-2 group"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <SparklesIcon className="h-8 w-8 text-cyan-500 group-hover:text-cyan-400 transition-colors drop-shadow-lg" />
              </motion.div>
              <span className="text-white text-xl font-bold group-hover:text-gray-200 transition-colors">
                TicketVisor
              </span>
            </NavLink>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            {[
              { to: "/app", label: "Analyzer" },
              { to: "/history", label: "History" },
              { to: "/analytics", label: "Analytics" }
            ].map((link, index) => (
              <motion.div
                key={link.to}
                variants={linkVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                custom={index}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative text-gray-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-xl text-sm font-medium ${
                      isActive 
                        ? 'text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20' 
                        : 'hover:bg-gray-800/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-xl -z-10"
                          layoutId="activeTab"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

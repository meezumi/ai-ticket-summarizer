import React from "react";
import { NavLink } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid"; 

const Navbar = () => {
  const linkStyle =
    "text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkStyle = "text-white bg-gray-700";

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <SparklesIcon className="h-8 w-8 text-cyan-400" />
              <span className="text-white text-xl font-bold">
                TicketVisor AI
              </span>
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink
              to="/app"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeLinkStyle : ""}`
              }
            >
              Analyzer
            </NavLink>
            {/* Add more links here in the future */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

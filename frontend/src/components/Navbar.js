import React from "react";
import { NavLink } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const linkStyle =
    "text-gray-400 hover:text-white transition-colors duration-300 px-3 py-2 rounded-md text-sm font-semibold";
  const activeLinkStyle = "text-cyan-400";

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center gap-2 group"
            >
              <SparklesIcon className="h-8 w-8 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
              <span className="text-white text-xl font-bold group-hover:text-gray-200 transition-colors">
                TicketVisor
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
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeLinkStyle : ""}`
              }
            >
              History
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeLinkStyle : ""}`
              }
            >
              Analytics
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
import "./TopNavbar.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';



const TopNavbar = () => {
   const navigate = useNavigate();

  const [showDropdown, setShowDropdown] =
    useState(false);

  // get email from localStorage
  const userEmail =
    localStorage.getItem("userEmail");

  const handleLogout = () => {

    // remove stored data
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");

    // redirect to home
    navigate("/login");
  };
  

  return (
      <div className="navbar">
       {/* Logo */}
      <div className="navbar-logo">
        <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="5" y="35" fontSize="28" fontWeight="bold" fill="#0066FF">
            FXCM
          </text>
          <text x="10" y="45" fontSize="8" fill="#FFA500">
            FOREX • CRYPTO • INDICES
          </text>
        </svg>
      </div>

        <div className="nav-right">
              <button
            className="user-btn"
            onClick={() =>
              setShowDropdown(!showDropdown)
            }
          >
            {userEmail || "User"} ▼
          </button>
                 {showDropdown && (
            <div className="dropdown-menu">

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

          <button className="nav-link">
            Contact Us
          </button>
        </div>
      </div>
  );
};

export default TopNavbar;

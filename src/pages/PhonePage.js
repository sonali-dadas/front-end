import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./PhonePage.css";

const PhonePage = () => {
      useEffect(() => {
      
          // save current page
          localStorage.setItem(
            "lastPage",
            window.location.pathname
          );
      
        }, []);

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode] = useState("DZ (+213)");
const handlePhoneChange = (e) => {

  // allow only digits
  const value = e.target.value.replace(/\D/g, "");

  setPhoneNumber(value);
};

const handleNext = async () => {

  if (!phoneNumber.trim()) {

    alert("Please enter a phone number");

    return;
  }

  try {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/onboarding/apply",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({

          phoneNumber:
            phoneNumber,

        }),
      }
    );

    const data =
      await response.text();

    if (response.ok) {

      console.log(
        "Phone Number Saved:",
        data
      );

      sessionStorage.setItem(
        "allowEmployment",
        "true"
      );

      navigate("/employment-status");

    } else {

      alert(data);
    }

  } catch (error) {

    console.error(error);

    alert("Server Error");
  }
};

const isFormComplete = () => {

  return (
    phoneNumber.trim() !== ""
  );
};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="phone-wrapper">
      <TopNavbar />
      <div className="phone-container">
        {/* Header with Progress Bar */}
        <div className="phone-header">
          <div className="header-top">
            <h2 className="header-title">Profile Setup</h2>
            <span className="progress-percent">40%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="phone-content">
          <div className="phone-form">
            {/* Back Button */}
            <button className="back-button" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#0066FF" />
              </svg>
              <span>Back</span>
            </button>

            {/* Icon */}
            <div className="phone-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 10.5V7c0 .55-.45 1-1 1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#0066FF" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="phone-title">Phone Number</h1>
            <p className="phone-subtitle">To help you with your account set up.</p>

            {/* Form Fields */}
            <div className="phone-form-group">
              <label>Country Code</label>
              <div className="country-code-select">
                <img src="https://flagcdn.com/dz.svg" alt="DZ" className="flag" />
                <span>{countryCode}</span>
              </div>
            </div>

            <div className="phone-form-group">
              <label>Contact number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Contact number"
              />
            </div>

            {/* Next Button */}
            {/* <button className="next-button" onClick={handleNext}>
              Next
            </button> */}

            <div className="button-container">
            <button
              onClick={handleNext}
              disabled={!isFormComplete()}
              className={`next-btn ${isFormComplete() ? "enabled" : "disabled"}`}
            >
              Next
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePage;

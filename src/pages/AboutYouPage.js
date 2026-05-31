import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./AboutYouPage.css";

const AboutYouPage = () => {
   useEffect(() => {

    // save current page
    localStorage.setItem(
      "lastPage",
      window.location.pathname
    );

  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormComplete = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.middleName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.dateOfBirth !== ""
    );
  };

const handleSubmit = async () => {

  if (!isFormComplete()) {
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

          firstName:
            formData.firstName,

          middleName:
            formData.middleName,

          lastName:
            formData.lastName,

          dateOfBirth:
            formData.dateOfBirth,

        }),
      }
    );

    const data =
      await response.text();

    if (response.ok) {

      console.log(
        "About You Saved:",
        data
      );

      // allow next page
      sessionStorage.setItem(
        "allowResidency",
        "true"
      );

      navigate("/residency");

    } else {

      alert(data);
    }

  } catch (error) {

    console.error(error);

    alert("Server Error");
  }
};

  const isFieldFilled = (fieldName) => {
    return formData[fieldName]?.trim() !== "";
  };

  return (
    <div className="about-you-wrapper">
      <TopNavbar />
      <div className="about-you-container">
      {/* Header with Progress Bar */}
      <div className="about-you-header">
        <div className="header-top">
          <h2 className="header-title">Profile Setup</h2>
          <span className="progress-percent">40%</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-you-content">
        <div className="about-you-form">
          {/* Icon */}
          <div className="about-you-icon">
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="35" r="15" stroke="#0066CC" strokeWidth="2" fill="none" />
              <path d="M40 50 L40 65" stroke="#0066CC" strokeWidth="2" />
              <path d="M30 60 L50 60" stroke="#0066CC" strokeWidth="2" />
              <circle cx="50" cy="25" r="8" stroke="#0066CC" strokeWidth="2" fill="white" />
              <text x="50" y="30" fontSize="14" fontWeight="bold" fill="#0066CC" textAnchor="middle">?</text>
            </svg>
          </div>

          {/* Title */}
          <h1 className="about-you-title">About You</h1>

          {/* Subtitle */}
          <p className="about-you-subtitle">
            For faster verification, provide the exact details as shown on your ID.
          </p>

          {/* Form */}
          {/* First Name and Middle Name Row */}
          <div className="form-row">
            <div className="form-group-wrapper">
              <label className="form-label">First Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="firstName"
                  placeholder="SS"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                />
                {isFieldFilled("firstName") && (
                  <svg className="checkmark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#00B050" />
                  </svg>
                )}
              </div>
            </div>
            <div className="form-group-wrapper">
              <label className="form-label">Middle Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="middleName"
                  placeholder="SS"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="form-input"
                />
                {isFieldFilled("middleName") && (
                  <svg className="checkmark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#00B050" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Last Name */}
          <div className="form-group-wrapper">
            <label className="form-label">Last Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                name="lastName"
                placeholder="SS"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
              />
              {isFieldFilled("lastName") && (
                <svg className="checkmark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#00B050" />
                </svg>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="form-group-wrapper">
            <label className="form-label">Date of Birth</label>
            <div className="input-wrapper">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="form-input"
              />
              {isFieldFilled("dateOfBirth") && (
                <svg className="checkmark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#00B050" />
                </svg>
              )}
              <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill="#999"/>
              </svg>
            </div>
            <p className="date-hint">dd/mm/yyyy</p>
          </div>

          {/* Next Button */}
          <div className="button-container">
            <button
              onClick={handleSubmit}
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

export default AboutYouPage;
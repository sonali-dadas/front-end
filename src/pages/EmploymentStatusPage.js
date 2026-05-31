import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./EmploymentStatusPage.css";

const EmploymentStatusPage = () => {
    useEffect(() => {
    
        // save current page
        localStorage.setItem(
          "lastPage",
          window.location.pathname
        );
    
      }, []);

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(null);

 const handleStatusSelect = async (status) => {

  try {

    setSelectedStatus(status);

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

          employmentStatus:
            status,

        }),
      }
    );

    const data =
      await response.text();

    if (response.ok) {

      console.log(
        "Employment Status Saved:",
        data
      );

      sessionStorage.setItem(
        "allowIndustry",
        "true"
      );

      navigate(
        "/industry",
        {
          state: {
            selectedStatus: status
          }
        }
      );

    } else {

      alert(data);
    }

  } catch (error) {

    console.error(error);

    alert("Server Error");
  }
};

  const handleBack = () => {
    navigate(-1);
  };

  const statusOptions = [
    { id: "employed", label: "Employed" },
    { id: "self-employed", label: "Self-Employed" },
    { id: "retired", label: "Retired" },
    { id: "unemployed", label: "Unemployed" },
  ];

  return (
    <div className="employment-wrapper">
      <TopNavbar />
      <div className="employment-container">
        {/* Header with Progress Bar */}
        <div className="employment-header">
          <div className="header-top">
            <h2 className="header-title">Work Experience</h2>
            <span className="progress-percent">70%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="employment-content">
          <div className="employment-form">
            {/* Back Button */}
            <button className="back-button" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#0066FF" />
              </svg>
              <span>Back</span>
            </button>

            {/* Icon */}
            <div className="employment-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16v-1H3.01V3h18v12h-1v1h2V2H2v15h8zm5-15h-1v2h1V1zm7 5h-1v2h1V6zM9 8h6v2H9V8zm0 4h6v2H9v-2z" fill="#0066FF" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="employment-title">Employment status</h1>

            {/* Status Options */}
            <div className="status-options">
              {statusOptions.map((option) => (
                <button
                  key={option.id}
                  className={`status-button ${selectedStatus === option.id ? "selected" : ""}`}
                  onClick={() => handleStatusSelect(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentStatusPage;

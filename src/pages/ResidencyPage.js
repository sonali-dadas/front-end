import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./ResidencyPage.css";

const ResidencyPage = () => {
     useEffect(() => {
  
      // save current page
      localStorage.setItem(
        "lastPage",
        window.location.pathname
      );
  
    }, []);

  const navigate = useNavigate();

const handleYes = async () => {

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

          residencyAndCitizenship:
            "Yes",

        }),
      }
    );

    const data =
      await response.text();

    if (response.ok) {

      console.log(
        "Residency Saved:",
        data
      );

      sessionStorage.setItem(
        "allowAddress",
        "true"
      );

      navigate("/address");

    } else {

      alert(data);
    }

  } catch (error) {

    console.error(error);

    alert("Server Error");
  }
};

const handleNo = async () => {

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

          residencyAndCitizenship:
            "No",

        }),
      }
    );

    const data =
      await response.text();

    if (response.ok) {

      console.log(
        "Residency Saved:",
        data
      );

      sessionStorage.setItem(
        "allowAddress",
        "true"
      );

      navigate("/address");

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

  return (
    <div className="residency-wrapper">
      <TopNavbar />
      <div className="residency-container">
      {/* Header with Progress Bar */}
      <div className="residency-header">
        <div className="header-top">
          <h2 className="header-title">Profile Setup</h2>
          <span className="progress-percent">40%</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="residency-content">
        <div className="residency-form">
          {/* Back Button */}
          <button className="back-button" onClick={handleBack}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#0066FF" />
            </svg>
            <span>Back</span>
          </button>

          {/* Icon */}
          <div className="residency-icon">
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="40" r="35" stroke="#0066CC" strokeWidth="2" fill="none" />
              <circle cx="28" cy="32" r="6" stroke="#0066CC" strokeWidth="2" fill="none" />
              <path d="M22 40 Q22 48 28 50" stroke="#0066CC" strokeWidth="2" fill="none" />
              <path d="M52 45 L60 35 L64 40 L60 50 Z" stroke="#0066CC" strokeWidth="2" fill="none" />
              <path d="M52 45 L52 55" stroke="#0066CC" strokeWidth="2" />
              <path d="M48 55 L56 55" stroke="#0066CC" strokeWidth="2" />
            </svg>
          </div>

          {/* Label */}
          <div className="residency-label">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#0066FF" strokeWidth="2" fill="none" />
              <text x="12" y="15" fontSize="12" fontWeight="bold" fill="#0066FF" textAnchor="middle">i</text>
            </svg>
            <span>Residency and citizenship</span>
          </div>

          {/* Question */}
          <h1 className="residency-question">
            Is the <span className="highlight">United Kingdom</span> also your country of citizenship and country of birth?
          </h1>

          {/* Buttons */}
          <div className="button-group">
            <button className="option-button" onClick={handleYes}>
              Yes
            </button>
            <button className="option-button" onClick={handleNo}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ResidencyPage;

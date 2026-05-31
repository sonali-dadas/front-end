import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./IndustryPage.css";

const IndustryPage = () => {
    useEffect(() => {
    
        // save current page
        localStorage.setItem(
          "lastPage",
          window.location.pathname
        );
    
      }, []);

  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const industries = [
    { id: "accommodation", label: "Accommodation and food service activities", icon: "🏨" },
    { id: "administrative", label: "Administrative and support service activities", icon: "👔" },
    { id: "agriculture", label: "Agriculture, forestry and fishing", icon: "🌾" },
    { id: "arts", label: "Arts, entertainment and recreation", icon: "🎨" },
    { id: "construction", label: "Construction", icon: "🏗️" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "electricity", label: "Electricity, gas, steam and air conditioning supply", icon: "⚡" },
    { id: "financial", label: "Financial and insurance activities", icon: "💰" },
    { id: "health", label: "Human health and social work activities", icon: "🏥" },
    { id: "information", label: "Information and communication", icon: "📡" },
  ];

const handleIndustrySelect = async (industry) => {

  try {

    setSelectedIndustry(industry);

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

          industry:
            industry.label,

        }),
      }
    );

    const data =
      await response.text();

    if (response.ok) {

      console.log(
        "Industry Saved:",
        data
      );

      sessionStorage.setItem(
        "allowRole",
        "true"
      );

      navigate(
        "/role",
        {
          state: {
            selectedIndustry: industry
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

  return (
    <div className="industry-wrapper">
      <TopNavbar />
      <div className="industry-container">
        {/* Header with Progress Bar */}
        <div className="industry-header">
          <div className="header-top">
            <h2 className="header-title">Work Experience</h2>
            <span className="progress-percent">70%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="industry-content">
          <div className="industry-form">
            {/* Back Button */}
            <button className="back-button" onClick={handleBack}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#0066FF" />
              </svg>
              <span>Back</span>
            </button>

            {/* Icon */}
            <div className="industry-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#0066FF" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="industry-title">Your Industry</h1>

            {/* Industry Options Grid */}
            <div className="industry-grid">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  className="industry-option"
                  onClick={() => handleIndustrySelect(industry)}
                >
                  <span className="industry-icon-text">{industry.icon}</span>
                  <span className="industry-label">{industry.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryPage;

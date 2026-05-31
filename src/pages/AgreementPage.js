import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./AgreementPage.css";
// import { useEffect } from "react";

const AgreementPage = () => {
      useEffect(() => {
      
          // save current page
          localStorage.setItem(
            "lastPage",
            window.location.pathname
          );
      
        }, []);
  const navigate = useNavigate();

  const handleAgree = () => {
    console.log("User agreed to terms");
    // Navigate to next page after agreement
    navigate("/success"); // or completion page
  };

  return (
    <div className="agreement-wrapper">
      <TopNavbar />
      <div className="agreement-container">
        {/* Main Content */}
        <div className="agreement-content">
          <div className="agreement-form">
            {/* Icon */}
            <div className="agreement-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" fill="#0066FF" opacity="0.2" stroke="#0066FF" strokeWidth="2" />
                <path d="M14 2v6h6M9 15h6M9 19h6M9 11h6" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="agreement-title">Your agreement</h1>

            {/* Agreement Section */}
            <div className="agreement-section">
              <h3 className="agreement-heading">
                <a href="#acknowledgement" className="agreement-link">Acknowledgement and Agreement</a>
              </h3>

              <p className="agreement-intro">By clicking the Agree button below, you;</p>

              {/* Agreement Points */}
              <ul className="agreement-list">
                <li>Confirm that the information you have provided is true and accurate.</li>
                <li>Agree to our <a href="#terms" className="agreement-link">Terms of Business</a></li>
                <li>Confirm that you have read and understood the <a href="#privacy" className="agreement-link">Privacy Policy</a> that deals with how we process your personal data.</li>
                <li>Confirm that you have read and understood the <a href="#rate" className="agreement-link">Rate Card</a> and <a href="#execution" className="agreement-link">Execution Risk</a></li>
                <li>Agree to electronic communication in accordance with the Terms and that you will receive trading statements and confirmations electronically.</li>
              </ul>

              {/* Warning Box */}
              <div className="agreement-warning">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#FFA500" />
                </svg>
                <p>It is important that you read the documents referred to above before proceeding. If anything is unclear, please contact us for further explanation.</p>
              </div>
            </div>

            {/* Agree Button */}
            <button className="agreement-button" onClick={handleAgree}>
              I agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementPage;

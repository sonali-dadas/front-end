import React, { useState ,useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./AnnualIncomePage.css";

const AnnualIncomePage = () => {
      useEffect(() => {
      
          // save current page
          localStorage.setItem(
            "lastPage",
            window.location.pathname
          );
      
        }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIndustry = location.state?.selectedIndustry;
  const selectedRole = location.state?.selectedRole;
  const [selectedIncome, setSelectedIncome] = useState(null);

  const incomeOptions = [
    "Less than $25,000 USD",
    "$25,000 up to $49,999 USD",
    "$50,000 up to $99,999 USD",
    "$100,000 up to $249,999 USD",
    "$250,000 up to $999,999 USD",
    "More than $1Million USD",
  ];

const handleIncomeSelect = async (income) => {

  try {

    setSelectedIncome(income);

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

          annualIncomeBeforeTax:
            income,

        }),
      }
    );

    const data =
      await response.text();

    if (response.ok) {

      console.log(
        "Annual Income Saved:",
        data
      );

      sessionStorage.setItem(
        "allowReferral",
        "true"
      );

      navigate(
        "/referral",
        {
          state: {
            selectedIndustry,
            selectedRole,
            selectedIncome: income
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
    <div className="income-wrapper">
      <TopNavbar />
      <div className="income-container">
        {/* Header with Progress Bar */}
        <div className="income-header">
          <div className="header-top">
            <h2 className="header-title">Financial Info</h2>
            <span className="progress-percent">80%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="income-content">
          <div className="income-form">
            {/* Icon */}
            <div className="income-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#0066FF" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="income-title">Annual income before tax</h1>
            <p className="income-subtitle">The total income you earn in a year: salary, pensions, interest, dividends, rental income etc.</p>

            {/* Income Options Grid */}
            <div className="income-grid">
              {incomeOptions.map((income, index) => (
                <button
                  key={index}
                  className={`income-option ${selectedIncome === income ? "selected" : ""}`}
                  onClick={() => handleIncomeSelect(income)}
                >
                  {income}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualIncomePage;

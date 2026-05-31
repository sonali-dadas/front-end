import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import "./ReferralPage.css";

const ReferralPage = () => {
    useEffect(() => {

        // save current page
        localStorage.setItem(
            "lastPage",
            window.location.pathname
        );

    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const [referralEmail, setReferralEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNext = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/onboarding/apply",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        friendsAndFamilyReferral: referralEmail,
                    }),
                }
            );

            const data = await response.text();

            if (response.ok) {

                console.log("Referral Saved:", data);

                navigate("/agreement", {
                    state: location.state,
                });

            } else {

                alert(data || "Failed to save referral");
            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        } finally {

            setLoading(false);
        }
    };

    const handleSkip = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/onboarding/apply",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        friendsAndFamilyReferral: "",
                    }),
                }
            );

            const data = await response.text();

            if (response.ok) {

                console.log("Referral Skipped:", data);

                navigate("/agreement", {
                    state: location.state,
                });

            } else {

                alert(data || "Failed");
            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        } finally {

            setLoading(false);
        }
    };

 const isValidEmail = (email) => {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isFormComplete = () => {

  return isValidEmail(referralEmail);
};

    return (
        <div className="referral-wrapper">
            <TopNavbar />
            <div className="referral-container">
                {/* Header with Progress Bar */}
                <div className="referral-header">
                    <div className="header-top">
                        <h2 className="header-title">Financial Info</h2>
                        <span className="progress-percent">90%</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="referral-content">
                    <div className="referral-form">
                        {/* Icon */}
                        <div className="referral-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#0066FF" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 className="referral-title">Friends and Family referral</h1>

                        {/* Info Box */}
                        <div className="referral-info">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="#0066FF" strokeWidth="2" />
                                <path d="M12 8v4M12 16h.01" stroke="#0066FF" strokeWidth="2" />
                            </svg>
                            <div>
                                <p>If referred by a friend or a family member, please enter the <strong>email address</strong> of the individual who referred you. If not, please click on <strong>Skip</strong>.</p>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="referral-form-group">

                   <input
  type="email"
  value={referralEmail}
  onChange={(e) =>
    setReferralEmail(e.target.value)
  }
  placeholder="Email Address"
/>

{
  referralEmail &&
  !isValidEmail(referralEmail) && (
    <p className="error-text">
      Please enter valid email
    </p>
  )
}

                        </div>

                        {/* Buttons */}
                        <button  onClick={handleNext}
  disabled={!isFormComplete()}
  className={`referral-next-button ${
    isFormComplete()
      ? "enabled"
      : "disabled"
  }`}
>
  {loading ? "Please wait..." : "Next"}
                        </button>
                        <button className="referral-skip-button" onClick={handleSkip}>
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralPage;


import React, { useEffect, useState } from "react";
import "./SignupSuccess.css";
import TopNavbar from "../components/TopNavbar";

const SignupSuccess = () => {

  const [email, setEmail] = useState("");

  const [username, setUsername] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  useEffect(() => {

    localStorage.setItem(
      "lastPage",
      window.location.pathname
    );

    fetchAccountDetails();

  }, []);

  const fetchAccountDetails = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/onboarding/account-details",
        {
          method: "GET",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        setUsername(
          data.username
        );

        setEmail(
          data.email
        );

        setAccountNumber(
          data.accountNumber
        );

      } else {

        alert(
          data.message ||
          "Failed to load account details"
        );
      }

    } catch (error) {

      console.error(error);

      alert("Server Error");
    }
  };

  const copyDetails = () => {

    navigator.clipboard.writeText(
`Username: ${username}
Email: ${email}
Account Number: ${accountNumber}`
    );

    alert("Copied Successfully!");
  };

  return (

    <div>

      <TopNavbar />

      <div className="signup-container">

        <div className="signup-card">
            

         

          <div className="icon">🎉  <h1>Congratulations!</h1></div>
           <h2>Your account has been created successfully.</h2>

          <div className="info-box">

            <p>
              <span>Username:</span>
              {email}
            </p>

            {/* <p>
              <span>Email:</span>
              {email}
            </p> */}

            <p>
              <span>Account number:</span>
              {accountNumber}
            </p>

            <button
              className="copy-btn"
              onClick={copyDetails}
            >
              Copy All
            </button>

          </div>

          <p className="email-text">

            We've sent this info to
            <b> {email}</b>

          </p>

          <div className="notice">

            ℹ You'll need a
            government-issued ID
            for verification.
            Keep it handy!

          </div>

          <p className="help-text">

            Need help?
            <a href="/"> Contact Us</a>

          </p>

        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;
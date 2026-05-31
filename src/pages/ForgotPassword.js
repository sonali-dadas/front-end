import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import "./Forgot.css";

const ForgotPassword = () => {
   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    sameAsEmail: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async () => {

    if (!formData.email) {
      alert("Please enter email");
      return;
    }

    if (
      !formData.sameAsEmail &&
      !formData.username
    ) {
      alert("Please enter username");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            username:
              formData.sameAsEmail
                ? formData.email
                : formData.username,
          }),
        }
      );

      const data =
        await response.text();

      if (response.ok) {

        alert(data);

      } else {

        alert(data);
      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <Navbar type="login" />

      <div className="forgot-wrapper">

        <div className="forgot-card">

          <div className="forgot-icon">
            🔒
          </div>

          <h1>Forgot Password</h1>

          <p className="forgot-subtitle">
            Enter your username and email address
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="forgot-input"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="sameAsEmail"
              checked={formData.sameAsEmail}
              onChange={handleChange}
            />

            <span>
              My username is same as email
            </span>
          </div>

          {!formData.sameAsEmail && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="forgot-input"
              value={formData.username}
              onChange={handleChange}
            />
          )}

          <div className="forgot-btn-row">

             <button className="cancel-btn" onClick={() =>
    navigate("/login")
  }>
              Cancel
            </button>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit"}
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
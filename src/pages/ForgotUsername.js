import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Forgot.css";
import { useNavigate } from "react-router-dom";


const ForgotUsername = () => {
     const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lastName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    countryCode: "+213",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (e) => {

    const numeric =
      e.target.value.replace(/\D/g, "");

    setFormData({
      ...formData,
      phoneNumber: numeric,
    });
  };

  const handleSubmit = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/onboarding/forgot-username",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
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
            ❓
          </div>

          <h1>Forgot username</h1>

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="forgot-input"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            className="forgot-input"
            value={formData.dob}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="forgot-input"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="phone-row">

            <select
              name="countryCode"
              className="country-code"
              value={formData.countryCode}
              onChange={handleChange}
            >
              <option value="+213">
                +213
              </option>
            </select>

            <input
              type="text"
              placeholder="Phone Number"
              className="phone-input"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
            />

          </div>

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

export default ForgotUsername;
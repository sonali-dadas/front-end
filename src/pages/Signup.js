import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";



const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: 'Algeria',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const countries = [
    'Algeria', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada',
    'China', 'Colombia', 'Czech Republic', 'Denmark', 'Egypt', 'Finland', 'France',
    'Germany', 'Greece', 'Hong Kong', 'Hungary', 'India', 'Indonesia', 'Ireland',
    'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Netherlands', 'New Zealand',
    'Nigeria', 'Norway', 'Pakistan', 'Philippines', 'Poland', 'Portugal', 'Russia',
    'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sweden',
    'Switzerland', 'Thailand', 'Turkey', 'United Arab Emirates', 'United Kingdom',
    'United States', 'Vietnam'
  ];

  const passwordRequirements = {
    length: formData.password.length >= 8 && formData.password.length <= 15,
    number: /\d/.test(formData.password),
    caseLetters: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allRequirementsMet =
      passwordRequirements.length &&
      passwordRequirements.number &&
      passwordRequirements.caseLetters;

    if (!allRequirementsMet) {
      alert("Please satisfy all password requirements");
      return;
    }

    if (!formData.email) {
      alert("Email is required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: formData.country,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const lastPage =
        localStorage.getItem("lastPage");
        setIsSubmitted(true);

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "userEmail",
          data.email
        );

        // navigate to platform page
        navigate("/platform");
      } else {
        console.error("Signup Failed:", data);
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Server error");
    }
  };

  if (isSubmitted) {
    return (
      <div className="signup-container">
        <div className="signup-form">
          <div className="success-message">
            <h2>Welcome!</h2>
            <p>Your account has been created successfully.</p>
            <p>Please check your email to verify your account.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>   <Navbar type="signup" />
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-form">
            <h1 className="signup-title">Start trading today</h1>
            <p className="signup-subtitle">Unlock seamless trading across platforms.</p>

            <form onSubmit={handleSubmit}>
              {/* Country Dropdown */}
              <div className="form-group">
                <label htmlFor="country">What country do you live in?</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="country-select"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className="form-input"
                />
              </div>

              {/* Password Field */}
              <div className="form-group password-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="password-requirements">
                <p className="requirements-title">Your secure password must:</p>
                <ul className="requirements-list">
                  <li className={passwordRequirements.length ? 'met' : ''}>
                    <span className="checkmark">✓</span>
                    Be between 8-15 characters long
                  </li>
                  <li className={passwordRequirements.number ? 'met' : ''}>
                    <span className="checkmark">✓</span>
                    Contain a number
                  </li>
                  <li className={passwordRequirements.caseLetters ? 'met' : ''}>
                    <span className="checkmark">✓</span>
                    Contain upper and lower case letters
                  </li>
                </ul>
              </div>

              {/* Privacy Notice */}
              <div className="privacy-notice">
                <p>
                  By proceeding I agree that Trading may send electronic mail about my application, and
                  free educational and promotional material relating to its products and services. To find
                  out more, please visit our <a href="#privacy">Privacy Policy</a>. You can opt-out at any time.
                </p>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">Sign up</button>

              {/* Login Link */}
              <div className="login-link">
                <p>Already started your application? <a href="#login" onClick={() => navigate("/login")}>
                  Log in
                </a></p>
              </div>
            </form>
          </div>
        </div>

        <footer className="signup-footer">
          <p>Copyright © 2026 Your Trading Company</p>
        </footer>
      </div>
    </>
  );
};

export default SignUp;

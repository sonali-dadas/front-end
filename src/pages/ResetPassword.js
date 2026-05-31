import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ResetPassword.css";

function ResetPassword() {

  const navigate = useNavigate();

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const params =
    new URLSearchParams(
      window.location.search
    );

  const token = params.get("token");

  const handleResetPassword =
    async () => {

      if (
        !newPassword ||
        !confirmPassword
      ) {

        alert("Please fill all fields");

        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await fetch(
            "http://localhost:8080/api/onboarding/reset-password",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                token: token,
                newPassword:
                  newPassword,
              }),
            }
          );

        const data =
          await response.text();

        if (response.ok) {

          alert(
            "Password reset successful"
          );

          navigate("/login");

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

      <div className="reset-container">

        <div className="reset-card">

          <h1>
            Reset Password
          </h1>

          <p>
            Enter your new password
          </p>

          <input
            type="password"
            placeholder="New Password"
            className="reset-input"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="reset-input"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            className="reset-btn"
            onClick={
              handleResetPassword
            }
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </div>
      </div>
    </>
  );
}

export default ResetPassword;
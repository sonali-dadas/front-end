import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {


    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      // if backend returns string
      const data = await response.json();

      if (response.ok) {

        console.log("Login Success:", data);
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "userEmail",
          data.email
        );


        // get last visited page
        const lastPage =
          localStorage.getItem("lastPage");

        // redirect to last page
        navigate(lastPage || "/platform");

      } else {

        alert(data || "Invalid Credentials");
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

      <div className="center-container">

        <div className="avatar"></div>

        <h1>Log In</h1>

        <p>Please enter your details</p>

        <input
          type="email"
          name="email"
          placeholder="Username"
          className="input"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="primary-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button className="outline-btn"  onClick={() =>
    navigate("/forgot-username")
  }>
          Forgot Username ?
        </button>

        <button className="outline-btn"  onClick={() =>
    navigate("/forgot-password")
  }>
          Forgot Password ?
        </button>

        <p className="small-text">
          Not registered yet ?{" "}

          <span onClick={() => navigate("/")}>
            Create an Account ?
          </span>
        </p>

      </div>
    </>
  );
}

export default Login;
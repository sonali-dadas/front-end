import { useNavigate } from "react-router-dom";

function Navbar({ type }) {
  const navigate = useNavigate();

  return (
    <div className="navbar">
          {/* Logo */}
      <div className="navbar-logo">
        <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="5" y="35" fontSize="28" fontWeight="bold" fill="#0066FF">
            FXCM
          </text>
          <text x="10" y="45" fontSize="8" fill="#FFA500">
            FOREX • CRYPTO • INDICES
          </text>
        </svg>
      </div>

      <div className="nav-right">
        <button className="lang-btn">English ▼</button>

        {type === "signup" ? (
          <button className="nav-link" onClick={() => navigate("/login")}>
            Log in
          </button>
        ) : (
          <button className="nav-link" onClick={() => navigate("/")}>
            Sign up
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
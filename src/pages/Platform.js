import { useState ,useEffect} from "react";
import PlatformCard from "../components/PlatformCard";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";

function Platform() {
  const [selected, setSelected] = useState("fxcm");
   const [loading, setLoading] =
    useState(false);

   useEffect(() => {

    // save current page
    localStorage.setItem(
      "lastPage",
      window.location.pathname
    );

  }, []);

  const navigate = useNavigate();
const handleContinue = async () => {

  try {

    setLoading(true);

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

          platformName:
            selected === "fxcm"
              ? "FXCM Trading Station"
              : "MetaTrader 4",

        }),
      }
    );

    const data =
      await response.text();

    if (response.ok) {

      console.log(
        "Onboarding Saved:",
        data
      );

      sessionStorage.setItem(
        "allowAboutYou",
        "true"
      );

      navigate("/about-you");

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
    <div>
  <TopNavbar />

      <div className="platform-page">
        <h1>Choose your platform</h1>

        <p>
          All available on mobile, desktop and tablet.
        </p>

        <div className="platform-grid">
          <PlatformCard
            title="FXCM Trading Station"
            subtitle="Our custom built trading platform"
            active={selected === "fxcm"}
            onClick={() => setSelected("fxcm")}
          />

          <PlatformCard
            title="MetaTrader 4"
            subtitle="FXCM’s licensed version - MT4 platform"
            active={selected === "mt4"}
            onClick={() => setSelected("mt4")}
          />
        </div>

              <button
          className="continue-btn"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Platform;
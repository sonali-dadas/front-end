import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Platform from "./pages/Platform";
import AboutYouPage from "./pages/AboutYouPage";
import ResidencyPage from "./pages/ResidencyPage";
import AddressPage from "./pages/AddressPage";
import PhonePage from "./pages/PhonePage";
import EmploymentStatusPage from "./pages/EmploymentStatusPage";
import IndustryPage from "./pages/IndustryPage";
import RolePage from "./pages/RolePage";
import AnnualIncomePage from "./pages/AnnualIncomePage";
import ReferralPage from "./pages/ReferralPage";
import AgreementPage from "./pages/AgreementPage";
import SignupSuccess from "./pages/SignupSuccess";
import ForgotUsername from "./pages/ForgotUsername";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute
  from "./components/ProtectedRoute";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/platform" element={<ProtectedRoute> <Platform /></ProtectedRoute>} />
        <Route path="/about-you" element={<ProtectedRoute> <AboutYouPage /></ProtectedRoute>} />
        <Route path="/residency" element={<ProtectedRoute> <ResidencyPage /></ProtectedRoute>} />
        <Route path="/address" element={<ProtectedRoute> <AddressPage /></ProtectedRoute>} />
        <Route path="/phone" element={<ProtectedRoute> <PhonePage /></ProtectedRoute>} />
        <Route path="/employment-status" element={<ProtectedRoute> <EmploymentStatusPage /></ProtectedRoute>} />
        <Route path="/industry" element={<ProtectedRoute> <IndustryPage /></ProtectedRoute>} />
        <Route path="/role" element={<ProtectedRoute> <RolePage /></ProtectedRoute>} />
        <Route path="/annual-income" element={<ProtectedRoute> <AnnualIncomePage /></ProtectedRoute>} />
        <Route path="/referral" element={<ProtectedRoute> <ReferralPage /></ProtectedRoute>} />
        <Route path="/agreement" element={<ProtectedRoute> <AgreementPage /></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute> <SignupSuccess /></ProtectedRoute>} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/forgot-username"
          element={<ForgotUsername />}
        />
        <Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
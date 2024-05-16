import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import Sidebar from "./components/Sidebar";
import logo from "./img/cropped-LOGO1-1.png";
import DashboardPartner from "./components/DashboardPartner";
function App() {
  return (
    <Router>
      <div className="d-flex">
        <div className="flex-grow-1">
          <Sidebar />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboardpartner" element={<DashboardPartner />} />
              {/*<Route path="/dashboard" element={<DashboardRouter user={user} />} />*/}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div
      style={{
        fontFamily: "Open sans",
        textAlign: "center",
        color: "#009be3",
      }}
    >
      <h1>Benvenuto!</h1>
      <img src={logo} style={{ width: "50%", margin: "auto" }} />
    </div>
  );
}

export default App;

{
  /*
import TechnicianDashboard from "./components/TechnicianDashboard";
import AdminDashboard from "./components/AdminDashboard";
import PartnerDashboard from "./components/PartnerDashboard";
import { ADMIN, PARTNER, TECHNICIAN } from "../../backend/src/conf/role";

function DashboardRouter({ user }) {
  if (user) {
    switch (user.role) {
      case TECHNICIAN:
        return <TechnicianDashboard />;
      case ADMIN:
        return <AdminDashboard />;
      case PARTNER:
        return <PartnerDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
*/
}

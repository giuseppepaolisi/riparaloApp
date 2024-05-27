import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarFactory from "./components/Sidebar/SidebarFactory";
import logo from "./img/cropped-LOGO1-1.png";
import DashboardPartner from "./pages/Partner/DashboardPartner";
import AggiungiCliente from "./pages/Partner/AggiungiCliente";
import ApriTicket from "./pages/Partner/ApriTicket";
import Clienti from "./pages/Partner/Clienti";
import Partner from "./pages/Admin/Partner";
import Tecnici from "./pages/Admin/Tecnici";
import AggiungiTecnico from "./pages/Admin/AggiungiTecnico";
import AggiungiPartner from "./pages/Admin/AggiungiPartner";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import PrivateRoute from "./redux/auth/PrivateRoute";

const HomePage = () => {
  return (
    <div
      style={{
        fontFamily: "Open sans",
        textAlign: "center",
        color: "#009be3",
      }}
    >
      <h1>Benvenuto!</h1>
      <img src={logo} style={{ width: "50%", margin: "auto" }} alt="Logo" />
    </div>
  );
};

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Router>
      <div className="d-flex">
        {isAuthenticated && <SidebarFactory />}
        <div
          className="flex-grow-1"
          style={{
            marginLeft: isAuthenticated ? "200px" : "0",
            padding: "20px",
          }}
        >
          <Routes>
            {/* Senza autenticazione */}
            <Route path="/" element={<HomePage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />

            {/* Admin Routes */}
            <Route element={<PrivateRoute roles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<HomePage />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/aggiungi-partner" element={<AggiungiPartner />} />
              <Route path="/tecnici" element={<Tecnici />} />
              <Route path="/aggiungi-tecnico" element={<AggiungiTecnico />} />
            </Route>

            {/* Partner Routes */}
            <Route element={<PrivateRoute roles={["partner"]} />}>
              <Route path="/partner-dashboard" element={<DashboardPartner />} />
              <Route path="/clienti" element={<Clienti />} />
              <Route path="/aggiungi-cliente" element={<AggiungiCliente />} />
              <Route path="/apri-ticket" element={<ApriTicket />} />
            </Route>

            {/* Tecnico Routes */}
            <Route element={<PrivateRoute roles={["tecnico", "admin"]} />}>
              <Route path="/tecnico-dashboard" element={<HomePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

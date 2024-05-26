import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
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

const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div
          className="flex-grow-1"
          style={{ marginLeft: "200px", padding: "20px" }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<DashboardPartner />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/clienti" element={<Clienti />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/aggiungi-cliente" element={<AggiungiCliente />} />
            <Route path="/aggiungi-partner" element={<AggiungiPartner />} />
            <Route path="/tecnici" element={<Tecnici />} />
            <Route path="/aggiungi-tecnico" element={<AggiungiTecnico />} />
            <Route path="/apri-ticket" element={<ApriTicket />} />
            {/*<Route path="/dashboard" element={<DashboardRouter user={user} />} />*/}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

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
      <img src={logo} style={{ width: "50%", margin: "auto" }} alt="Logo" />
    </div>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarFactory from "./components/Sidebar/SidebarFactory";
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
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import HomePage from "./pages/Homepage";
import DashboardTecnico from "./pages/Tecnico/DashboardTecnico";
import Error403 from "./pages/error/Error403";
import Error404 from "./pages/error/Error404";
import Error500 from "./pages/error/Error500";
import Devices from "./pages/Admin/Devices";
import AddDevice from "./pages/Admin/AddDevice";
import EditDevice from "./pages/Admin/EditDevice";
//import AccountEdit from "./pages/AccountEdit";  // Importa il nuovo componente

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
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />

            {/* Admin Routes */}
            <Route element={<PrivateRoute roles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<DashboardAdmin />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/aggiungi-partner" element={<AggiungiPartner />} />
              <Route path="/tecnici" element={<Tecnici />} />
              <Route path="/aggiungi-tecnico" element={<AggiungiTecnico />} />
              <Route path="/modelli" element={<Devices />} />
              <Route path="/aggiungi-modello" element={<AddDevice />} />
              <Route path="/modifica-modello/:id" element={<EditDevice />} />
              {/*<Route path="/account" element={<AccountEdit userType="Admin" userData={{ email: 'admin@example.com' }} />} />*/}
            </Route>

            {/* Partner Routes */}
            <Route element={<PrivateRoute roles={["partner"]} />}>
              <Route path="/partner-dashboard" element={<DashboardPartner />} />
              <Route path="/clienti" element={<Clienti />} />
              <Route path="/aggiungi-cliente" element={<AggiungiCliente />} />
              <Route path="/apri-ticket" element={<ApriTicket />} />
              <Route path="/about-us" element={<AboutUs />} />
              {/*<Route path="/account" element={<AccountEdit userType="Partner" userData={{ ragioneSociale: 'Partner Srl' }} />} />*/}
            </Route>

            {/* Tecnico Routes */}
            <Route element={<PrivateRoute roles={["tecnico", "admin"]} />}>
              <Route path="/tecnico-dashboard" element={<DashboardTecnico />} />
              {/*<Route path="/account" element={<AccountEdit userType="Tecnico" userData={{ cognome: 'Rossi', nome: 'Mario' }} />} />*/}
            </Route>

            {/* Error Routes */}
            <Route path="/403" element={<Error403 />} />
            <Route path="/500" element={<Error500 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarFactory from "./components/Sidebar/SidebarFactory";
import DashboardPartner from "./pages/Partner/DashboardPartner";
import AddCustomer from "./pages/Partner/AddCustomer";
import Customers from "./pages/Partner/Customers";
import Partners from "./pages/Admin/Partners";
import Technicians from "./pages/Admin/Technicians";
import AddTechnician from "./pages/Admin/AddTechnician";
import AddPartner from "./pages/Admin/AddPartner";
import AboutUs from "./pages/Generic/AboutUs";
import Login from "./pages/Authentication/Login";
import Logout from "./pages/Authentication/Logout";
import PrivateRoute from "./redux/auth/PrivateRoute";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import HomePage from "./pages/Generic/Homepage";
import DashboardTechnician from "./pages/Tecnico/DashboardTechnician";
import Error403 from "./pages/error/Error403";
import Error404 from "./pages/error/Error404";
import Error500 from "./pages/error/Error500";
import CreateTicket from "./pages/Ticket/CreateTicket";
import Devices from "./pages/Admin/Devices";
import AddDevice from "./pages/Admin/AddDevice";
import EditDevice from "./pages/Admin/EditDevice";
import EditCustomer from "./pages/Partner/EditCustomer";
import { checkToken, loadUserFromStorage } from "./redux/auth/slice";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/js/theme";
import Account from "./pages/Generic/Account";
import AcceptedTickets from "./pages/Ticket/AcceptedTickets";
import EdiTicketTechnician from "./pages/Ticket/EditTicketTechnician";
import EdiTicketPartner from "./pages/Ticket/EditTicketPartner";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Applica il tema personalizzato */}
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
                <Route path="/partner" element={<Partners />} />
                <Route path="/aggiungi-partner" element={<AddPartner />} />
                <Route path="/tecnici" element={<Technicians />} />
                <Route path="/aggiungi-tecnico" element={<AddTechnician />} />
                <Route path="/modelli" element={<Devices />} />
                <Route path="/aggiungi-modello" element={<AddDevice />} />
                <Route path="/modifica-modello/:id" element={<EditDevice />} />
                <Route path="/partner" element={<Partners />} />
                <Route path="/tecnici" element={<Technicians />} />
                <Route
                  path="/edit-ticket-technician/:id"
                  element={<EdiTicketTechnician />}
                />
              </Route>

              {/* Partner Routes */}
              <Route element={<PrivateRoute roles={["partner"]} />}>
                <Route
                  path="/partner-dashboard"
                  element={<DashboardPartner />}
                />
                <Route path="/aggiungi-cliente" element={<AddCustomer />} />
                <Route path="/apri-ticket" element={<CreateTicket />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/clienti" element={<Customers />} />
                <Route
                  path="/modifica-cliente/:id"
                  element={<EditCustomer />}
                />
                <Route
                  path="/edit-ticket-partner/:id"
                  element={<EdiTicketPartner />}
                />
              </Route>

              {/* Tecnico Routes */}
              <Route element={<PrivateRoute roles={["tecnico"]} />}>
                <Route
                  path="/tecnico-dashboard"
                  element={<DashboardTechnician />}
                />
                <Route
                  path="/tickets-accettati"
                  element={<AcceptedTickets />}
                />
                <Route
                  path="/edit-ticket-technician/:id"
                  element={<EdiTicketTechnician />}
                />
              </Route>

              {/* Shared Routes */}
              <Route
                element={
                  <PrivateRoute roles={["tecnico", "admin", "partner"]} />
                }
              >
                <Route path="/account" element={<Account />} />
              </Route>

              {/* Error Routes */}
              <Route path="/403" element={<Error403 />} />
              <Route path="/500" element={<Error500 />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;

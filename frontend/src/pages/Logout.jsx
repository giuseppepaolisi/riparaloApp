// pages/Logout.jsx
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/slice";
import "bootstrap/dist/css/bootstrap.min.css";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center p-5">
        <h2 className="card-title mb-4">
          Sei sicuro di voler effettuare il logout?
        </h2>
        <p className="card-text mb-4">
          Cliccando su &apos;Logout&apos;, verrai disconnesso dall&apos;account.
        </p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary me-3" onClick={() => navigate(-1)}>
            Annulla
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;

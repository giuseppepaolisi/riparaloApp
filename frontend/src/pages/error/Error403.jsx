import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Error403 = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1 text-warning">403</h1>
      <p className="lead">Access Denied.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
};

export default Error403;

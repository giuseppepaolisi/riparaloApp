import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Error500 = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1 text-danger">500</h1>
      <p className="lead">Internal Server Error.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
};

export default Error500;

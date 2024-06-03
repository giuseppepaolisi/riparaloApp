import { login } from "../redux/auth/slice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FormInput from "../components/FormInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(login({ token: data.token, user: data.user }));

        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("rememberMe");
        }
      } else {
        setError(data.error);
        throw new Error(
          data.error || "Non è stato possibile effettuare il login"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <FormInput
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  required
                />
                <FormInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  required
                />
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Rimani connesso
                  </label>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Accedi
                  </button>
                </div>
              </form>
              {error ? (
                <div
                  className="alert alert-danger"
                  style={{ marginTop: "20px" }}
                  role="alert"
                >
                  {error}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

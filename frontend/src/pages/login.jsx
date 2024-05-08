//import './assets/scss/sb-admin-2.scss'; // Adjust the path as necessary
import "../assets/css/sb-admin-2.min.css";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log(email);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const text = await response.text();
      console.log("TESTO" + text);
      const data = JSON.parse(text);
      if (response.ok) {
        console.log("Login effettuato con successo", data);
        //login({ token: data.token, user: data.user })
        //dispatch(login({ token: data.token, user: data.user }));
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

  //aggiunge la classe al body
  useEffect(() => {
    // Aggiungere una classe al body quando il componente viene montato
    document.body.classList.add("bg-gradient-primary");

    // Rimuovere la classe quando il componente viene smontato
    return () => {
      document.body.classList.remove("bg-gradient-primary");
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-7 col-md-5">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-1">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Benvenuto!</h1>
                    </div>
                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Indirizzo email..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Ricordami
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </button>
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

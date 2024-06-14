import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomAlert from "../components/Alert/CustomAlert";

const EditUser = () => {
  const { token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    email: "",
    nome: "",
    cognome: "",
    telefono: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Errore nel recuperare i dati dell'utente");
        }
        setUserData({
          email: data.email || "",
          nome: data.nome || "",
          cognome: data.cognome || "",
          telefono: data.telefono || "",
        });
      } catch (error) {
        setAlert({
          open: true,
          msg: error.message,
          severity: "error",
        });
      }
    };
    fetchUserData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setAlert({
        open: true,
        msg: "Le nuove password non coincidono",
        severity: "error",
      });
      return;
    }

    const updatedData = {};
    Object.keys(userData).forEach((key) => {
      if (userData[key]) {
        updatedData[key] = userData[key];
      }
    });

    if (oldPassword) {
      updatedData.oldPassword = oldPassword;
    }
    if (newPassword) {
      updatedData.newPassword = newPassword;
    }

    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Non è stato possibile aggiornare i dati dell'utente");
      }
      setAlert({
        open: true,
        msg: "Dati utente aggiornati con successo",
        severity: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        msg: error.message,
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div className="container mt-3 mb-4">
      <h2>Modifica Dati Utente</h2>
      {alert.open && (
        <CustomAlert
          msg={alert.msg}
          severity={alert.severity}
          onClose={handleCloseAlert}
        />
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci l'email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome"
                name="nome"
                value={userData.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il cognome"
                name="cognome"
                value={userData.cognome}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formTelefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il telefono"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formOldPassword">
              <Form.Label>Vecchia Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la vecchia password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formNewPassword">
              <Form.Label>Nuova Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la nuova password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Conferma Nuova Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma la nuova password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="mx-auto">
            <Button variant="success" type="submit" className="mt-3">
              Aggiorna
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditUser;

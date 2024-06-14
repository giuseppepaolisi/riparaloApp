import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import CustomAlert from "../components/Alert/CustomAlert";

const UserDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    email: "",
    nome: "",
    cognome: "",
    telefono: "",
  });
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
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
          throw new Error(
            data.error || "Errore nel recuperare i dati dell'utente"
          );
        }
        setUserData(data);
      } catch (error) {
        console.error(error);
        setAlert({
          open: true,
          msg: error.message,
          severity: "error",
        });
      }
    };
    fetchUserData();
  }, [id, token]);

  const handleEditClick = () => {
    navigate(`/modifica-utente/${id}`);
  };

  return (
    <div className="container mt-3 mb-4">
      <h2>Dettagli Utente</h2>
      {alert.open && <CustomAlert msg={alert.msg} severity={alert.severity} />}
      <Card>
        <Card.Body>
          <Card.Title>Informazioni Utente</Card.Title>
          <Row>
            <Col>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Nome:</strong> {userData.nome}
              </p>
            </Col>
            <Col>
              <p>
                <strong>Cognome:</strong> {userData.cognome}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Telefono:</strong> {userData.telefono}
              </p>
            </Col>
          </Row>
          <Button variant="primary" onClick={handleEditClick}>
            Modifica
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserDetails;

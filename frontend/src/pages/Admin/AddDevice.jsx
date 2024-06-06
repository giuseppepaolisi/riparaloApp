import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddDevice = () => {
  const { token } = useSelector((state) => state.auth);
  const [modello, setModello] = useState("");
  const [marca, setMarca] = useState("");
  const [servizi, setServizi] = useState([{ servizio: "", prezzo: "" }]);

  const handleServizioChange = (index, event) => {
    const values = [...servizi];
    values[index][event.target.name] = event.target.value;
    setServizi(values);
  };

  const handleAddServizio = () => {
    setServizi([...servizi, { servizio: "", prezzo: "" }]);
  };

  const handleRemoveServizio = (index) => {
    const values = [...servizi];
    values.splice(index, 1);
    setServizi(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      modello,
      marca,
      servizi: servizi.map((servizio) => ({
        servizio: servizio.servizio,
        prezzo: Number(servizio.prezzo),
      })),
    };
    console.log(token);
    console.log(formData);
    // Invia i dati tramite POST
    const response = await fetch("/api/device", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile aggiungere il cliente"
      );
    }
    console.log(data);
  };

  return (
    <div className="container mt-3 mb-4">
      <h2>Aggiungi Dispositivo</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formModello">
              <Form.Label>Modello</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il modello"
                value={modello}
                onChange={(e) => setModello(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        {servizi.map((servizio, index) => (
          <div key={index} className="my-3">
            <Row>
              <Col>
                <Form.Group controlId={`formServizio${index}`}>
                  <Form.Label>Servizio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il servizio"
                    name="servizio"
                    value={servizio.servizio}
                    onChange={(e) => handleServizioChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs="auto" className="d-flex align-items-end">
                <Form.Group controlId={`formPrezzo${index}`}>
                  <Form.Label>Prezzo</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci il prezzo"
                    name="prezzo"
                    value={servizio.prezzo}
                    onChange={(e) => handleServizioChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs="auto" className="d-flex align-items-end">
                <Button
                  variant="danger"
                  onClick={() => handleRemoveServizio(index)}
                >
                  - Rimuovi
                </Button>
              </Col>
            </Row>
          </div>
        ))}
        <Row>
          <Col xs={6} className="mx-auto">
            <Button variant="primary" onClick={handleAddServizio}>
              + Aggiungi Servizio
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className="mx-auto">
            <Button variant="success" type="submit" className="mt-3">
              Invia
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddDevice;

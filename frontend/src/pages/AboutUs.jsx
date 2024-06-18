import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Title from "../components/Title";

const AboutUs = () => {
  return (
    <Container className="mt-5">
      <Title title="Sedi e contatti" />
      <Row className="text-center">
        <Col>
          <h3 className="text-primary">Sedi e contatti</h3>
          <p className="text-muted"></p>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="text-center">
          <Card
            className="mb-4 shadow-sm"
            style={{ backgroundColor: "#e9ecef", borderRadius: "15px" }}
          >
            <Card.Body>
              <Card.Title className="text-primary">Crotone</Card.Title>
              <Card.Text>
                VIA XXV Aprile, 96 – 88900 CROTONE (KR)
                <br />
                Cellulare: 329 3033166
                <br />
                Email:{" "}
                <a href="mailto:crotone@riparalokr.it">crotone@riparalokr.it</a>
              </Card.Text>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.469605188725!2d17.121582415308553!3d39.08585107954809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133f9267a1b78c01%3A0xabcde12345f!2sVia%20XXV%20Aprile%2C%2096%2C%2088900%20Crotone%20KR!5e0!3m2!1sen!2sit!4v1625631234567!5m2!1sen!2sit"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "15px" }}
                allowFullScreen=""
                loading="lazy"
                title="Crotone Location"
              ></iframe>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="text-center">
          <Card
            className="mb-4 shadow-sm"
            style={{ backgroundColor: "#e9ecef", borderRadius: "15px" }}
          >
            <Card.Body>
              <Card.Title className="text-primary">
                Isola di Capo Rizzuto
              </Card.Title>
              <Card.Text>
                VIA LE CASTELLA, 28/B – 88841 ISOLA DI CAPO RIZZUTO (KR)
                <br />
                Cellulare: 327 7808684
                <br />
                Email:{" "}
                <a href="mailto:isola@riparalokr.it">isola@riparalokr.it</a>
              </Card.Text>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.469605188725!2d17.121582415308553!3d39.08585107954809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133f9267a1b78c01%3A0xabcde12345f!2sVia%20LE%20CASTELLA%2C%2028%2FB%2C%2088841%20Isola%20di%20Capo%20Rizzuto%20KR!5e0!3m2!1sen!2sit!4v1625631234567!5m2!1sen!2sit"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "15px" }}
                allowFullScreen=""
                loading="lazy"
                title="Isola di Capo Rizzuto Location"
              ></iframe>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;

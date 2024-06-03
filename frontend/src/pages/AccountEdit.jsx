import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import FormInput from "../components/FormInput";

const AccountEdit = ({ userType, userData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(userData || {}); // Assicurati che userData sia sempre un oggetto
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderFormFields = () => {
    switch (userType) {
      case "Admin":
        return (
          <>
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              required
            />
          </>
        );
      case "Tecnico":
        return (
          <>
            <FormInput
              label="Cognome"
              type="text"
              id="cognome"
              name="cognome"
              value={formData.cognome || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Nome"
              type="text"
              id="nome"
              name="nome"
              value={formData.nome || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              required
            />
          </>
        );
      case "Partner":
        return (
          <>
            <FormInput
              label="Ragione Sociale"
              type="text"
              id="ragioneSociale"
              name="ragioneSociale"
              value={formData.ragioneSociale || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Rappresentante Legale"
              type="text"
              id="rappresentanteLegale"
              name="rappresentanteLegale"
              value={formData.rappresentanteLegale || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Codice Univoco"
              type="text"
              id="codiceUnivoco"
              name="codiceUnivoco"
              value={formData.codiceUnivoco || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="P.IVA"
              type="text"
              id="piva"
              name="piva"
              value={formData.piva || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="PEC"
              type="email"
              id="pec"
              name="pec"
              value={formData.pec || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Telefono"
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Città"
              type="text"
              id="citta"
              name="citta"
              value={formData.citta || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Via"
              type="text"
              id="via"
              name="via"
              value={formData.via || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="CAP"
              type="text"
              id="cap"
              name="cap"
              value={formData.cap || ""}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Provincia"
              type="text"
              id="provincia"
              name="provincia"
              value={formData.provincia || ""}
              onChange={handleChange}
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {renderFormFields()}
      <Button variant="primary" type="submit">
        Salva
      </Button>
      <Button variant="secondary" onClick={onCancel} className="ml-2">
        Annulla
      </Button>
    </Form>
  );
};

AccountEdit.propTypes = {
  userType: PropTypes.oneOf(["Admin", "Tecnico", "Partner"]).isRequired,
  userData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AccountEdit;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import FormInput from '../../components/FormInput';
import FormActions from '../../components/FormActions';
import CustomAlert from '../../components/Alert/CustomAlert';
import { createTicket } from '../../api/apiPartner';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    nome_cliente: '',
    cognome_cliente: '',
    telefono_cliente: '',
    descrizione_problema: '',
    marca: '',
    modello: '',
    servizi: [{ servizio: '', prezzo: '' }],
    acconto: '',
    imei: '',
    pin: '',
    seriale: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleServiceChange = (index, e) => {
    const { id, value } = e.target;
    const newServices = formData.servizi.map((service, i) =>
      i === index ? { ...service, [id]: value } : service
    );
    setFormData({ ...formData, servizi: newServices });
  };

  const addService = () => {
    setFormData({
      ...formData,
      servizi: [...formData.servizi, { servizio: '', prezzo: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Filtra i servizi vuoti
    const filteredServices = formData.servizi.filter(service => service.servizio && service.prezzo);
    
    try {
      await createTicket(token, { ...formData, servizi: filteredServices });
      setSuccess('Ticket creato con successo');
      setTimeout(() => navigate('/partner-dashboard'), 2000);
    } catch (err) {
      setError('Errore nella creazione del ticket');
    }
  };

  return (
    <FormContainer title="Apri Ticket">
      <form onSubmit={handleSubmit}>
        <FormInput
          id="nome_cliente"
          label="Nome Cliente"
          type="text"
          value={formData.nome_cliente}
          onChange={handleChange}
          required
        />
        <FormInput
          id="cognome_cliente"
          label="Cognome Cliente"
          type="text"
          value={formData.cognome_cliente}
          onChange={handleChange}
          required
        />
        <FormInput
          id="telefono_cliente"
          label="Telefono Cliente"
          type="text"
          value={formData.telefono_cliente}
          onChange={handleChange}
          required
        />
        <FormInput
          id="descrizione_problema"
          label="Descrizione Problema"
          type="text"
          value={formData.descrizione_problema}
          onChange={handleChange}
          required
        />
        <FormInput
          id="marca"
          label="Marca"
          type="text"
          value={formData.marca}
          onChange={handleChange}
          required
        />
        <FormInput
          id="modello"
          label="Modello"
          type="text"
          value={formData.modello}
          onChange={handleChange}
          required
        />
        {formData.servizi.map((service, index) => (
          <div key={index}>
            <FormInput
              id="servizio"
              label="Servizio"
              type="text"
              value={service.servizio}
              onChange={(e) => handleServiceChange(index, e)}
              required
            />
            <FormInput
              id="prezzo"
              label="Prezzo"
              type="number"
              value={service.prezzo}
              onChange={(e) => handleServiceChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addService}>Aggiungi Servizio</button>
        <FormInput
          id="acconto"
          label="Acconto"
          type="number"
          value={formData.acconto}
          onChange={handleChange}
          required
        />
        <FormInput
          id="imei"
          label="IMEI"
          type="text"
          value={formData.imei}
          onChange={handleChange}
          required
        />
        <FormInput
          id="pin"
          label="PIN"
          type="text"
          value={formData.pin}
          onChange={handleChange}
          required
        />
        <FormInput
          id="seriale"
          label="Seriale"
          type="text"
          value={formData.seriale}
          onChange={handleChange}
          required
        />
        <FormActions onSubmit={handleSubmit} />
      </form>
      {error && <CustomAlert msg={error} severity="error" onClose={() => setError('')} />}
      {success && <CustomAlert msg={success} severity="success" onClose={() => setSuccess('')} />}
    </FormContainer>
  );
};

export default CreateTicket;

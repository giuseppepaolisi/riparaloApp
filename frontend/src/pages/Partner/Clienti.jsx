import "bootstrap/dist/css/bootstrap.min.css";

import clientiData from "../../assets/json/clienti.json";
import CustomModal from "../../components/CustomModal";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Clienti = () => {
  const [clienti, setClienti] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClientIndex, setSelectedClientIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("cellulare");

  useEffect(() => {
    setClienti(clientiData);
  }, []);

  const handleDelete = (index) => {
    setSelectedClientIndex(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedClientIndex !== null) {
      const newClienti = [...clienti];
      newClienti.splice(selectedClientIndex, 1);
      setClienti(newClienti);
      setSelectedClientIndex(null);
    }
    setShowModal(false);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const filteredClienti = clienti.filter((cliente) => {
    return cliente[searchType].toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-3 mb-4">
      <h2>Clienti</h2>
      <div className="mt-3 mb-5 d-flex justify-content-between">
        <Link to="/aggiungi-cliente" className="btn btn-primary">
          + Aggiungi cliente
        </Link>{" "}
        <div
          className="input-group input-group-sm"
          style={{ maxWidth: "400px" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder={`Cerca per ${searchType}`}
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <select
            className="form-select"
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <option value="cellulare">Cellulare</option>
            <option value="nome">Nome</option>
            <option value="cognome">Cognome</option>
          </select>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cellulare</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Ticket Attivi</th>
            <th>Ticket Totali</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
          {filteredClienti.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.cellulare}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cognome}</td>
              <td>{cliente.ticket_aperti}</td>
              <td>{cliente.ticket_totali}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Conferma Eliminazione"
        body="Sei sicuro di voler eliminare questo cliente?"
        onConfirm={confirmDelete}
        confirmText="Elimina"
        cancelText="Annulla"
      />
    </div>
  );
};

export default Clienti;

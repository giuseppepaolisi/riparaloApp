import "bootstrap/dist/css/bootstrap.min.css";

import tecniciData from "../../assets/json/tecnici.json";
import CustomModal from "../../components/CustomModal";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tecnici = () => {
  const [tecnici, setTecnici] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTecnicoIndex, setSelectedTecnicoIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("email");

  useEffect(() => {
    setTecnici(tecniciData);
  }, []);

  const handleDelete = (index) => {
    setSelectedTecnicoIndex(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedTecnicoIndex !== null) {
      const newTecnici = [...tecnici];
      newTecnici.splice(selectedTecnicoIndex, 1);
      setTecnici(newTecnici);
      setSelectedTecnicoIndex(null);
    }
    setShowModal(false);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const filteredTecnici = tecnici.filter((tecnico) => {
    return tecnico[searchType].toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-3 mb-4">
      <h2>Tecnici</h2>
      <div className="mt-3 mb-5 d-flex justify-content-between">
        <Link to="/aggiungi-tecnico" className="btn btn-primary">
          + Aggiungi tecnico
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
            <option value="email">Email</option>
            <option value="cognome">Cognome</option>
            <option value="nome">Nome</option>
          </select>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cognome</th>
            <th>Nome</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTecnici.map((tecnico, index) => (
            <tr key={index}>
              <td>{tecnico.cognome}</td>
              <td>{tecnico.nome}</td>
              <td>{tecnico.email}</td>
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
        body="Sei sicuro di voler eliminare questo tecnico?"
        onConfirm={confirmDelete}
        confirmText="Elimina"
        cancelText="Annulla"
      />
    </div>
  );
};

export default Tecnici;

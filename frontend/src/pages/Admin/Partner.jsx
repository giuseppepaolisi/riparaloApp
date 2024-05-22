import "bootstrap/dist/css/bootstrap.min.css";

import partnerData from "../../assets/json/partner.json";
import CustomModal from "../../components/CustomModal";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Partner = () => {
  const [partner, setPartner] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("email");

  useEffect(() => {
    setPartner(partnerData);
  }, []);

  const handleDelete = (index) => {
    setSelectedPartnerIndex(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedPartnerIndex !== null) {
      const newPartner = [...partner];
      newPartner.splice(selectedPartnerIndex, 1);
      setPartner(newPartner);
      setSelectedPartnerIndex(null);
    }
    setShowModal(false);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const filteredPartner = partner.filter((partner) => {
    return partner[searchType].toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-3 mb-4">
      <h2>Partner</h2>
      <div className="mt-3 mb-5 d-flex justify-content-between">
        <Link to="/aggiungi-partner" className="btn btn-primary">
          + Aggiungi partner
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
            <option value="ragioneSociale">Rag. Sociale</option>
            <option value="rappresentanteLegale">Rapp. Legale</option>
            <option value="provincia">Provincia</option>
          </select>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rag. Sociale</th>
            <th>Rapp. Legale</th>
            <th>Email</th>
            <th>Provincia</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredPartner.map((partner, index) => (
            <tr key={index}>
              <td>{partner.ragioneSociale}</td>
              <td>{partner.rappresentanteLegale}</td>
              <td>{partner.email}</td>
              <td>{partner.provincia}</td>
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
        body="Sei sicuro di voler eliminare questo partner?"
        onConfirm={confirmDelete}
        confirmText="Elimina"
        cancelText="Annulla"
      />
    </div>
  );
};

export default Partner;

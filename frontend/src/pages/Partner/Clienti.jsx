import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../../components/DeleteButtorn";
import DeleteModal from "../../components/DeleteModal";

const Clienti = () => {
  const [clienti, setClienti] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("telefono");

  const [delModal, setDelModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const { token } = useSelector((state) => state.auth);

  const fetchClienti = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      const response = await fetch("/api/customers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore nella lista clienti");
      }

      const json = await response.json();

      if (Array.isArray(json.customers)) {
        setClienti(json.customers);
      } else {
        throw new Error("La risposta del server non è un array");
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  //eliminazione cliente
  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`/api/customer/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Errore nell'eliminazione del cliente");
      }
      setClienti(clienti.filter((cliente) => cliente._id !== id));
      setDelModal(false); // Chiudere il modal dopo l'eliminazione
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClienti();
  }, [fetchClienti]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const filteredClienti = clienti.filter((cliente) => {
    return cliente[searchType].toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeleteClick = (id) => {
    setSelectedClientId(id);
    setDelModal(true);
  };

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
            <option value="telefono">Telefono</option>
            <option value="nome">Nome</option>
            <option value="cognome">Cognome</option>
          </select>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Telefono</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Elimina</th>
          </tr>
        </thead>
        <tbody>
          {filteredClienti.map((cliente) => (
            <tr key={cliente._id}>
              <td>{cliente.telefono}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cognome}</td>
              <td>
                <DeleteButton onClick={() => handleDeleteClick(cliente._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {delModal && (
        <DeleteModal
          message={"Vuoi eliminare il cliente?"}
          onDelete={() => deleteCustomer(selectedClientId)}
          onCancel={() => setDelModal(false)}
        />
      )}
    </div>
  );
};

export default Clienti;

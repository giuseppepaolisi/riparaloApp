import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import { fetchClienti, deleteCliente } from "../../api/apiPartner";

const Clienti = () => {
  const [clienti, setClienti] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("telefono");
  const [delModal, setDelModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector((state) => state.auth);

  const loadClienti = useCallback(async () => {
    if (!token) return;
    try {
      const customers = await fetchClienti(token);
      setClienti(customers);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  const handleDeleteCustomer = useCallback(
    async (id) => {
      try {
        await deleteCliente(token, id);
        setClienti((prevClienti) =>
          prevClienti.filter((cliente) => cliente._id !== id)
        );
        setDelModal(false);
      } catch (error) {
        console.error(error);
      }
    },
    [token]
  );

  useEffect(() => {
    loadClienti();
  }, [loadClienti]);

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);
  const handleSearchTypeChange = (e) => setSearchType(e.target.value);

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
        </Link>
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
      {isLoading && <div>Loading...</div>}

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
          {!isLoading &&
            filteredClienti.map((cliente) => (
              <tr key={cliente._id}>
                <td>{cliente.telefono}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cognome}</td>
                <td>
                  <DeleteButton
                    onClick={() => handleDeleteClick(cliente._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {delModal && (
        <DeleteModal
          message="Vuoi eliminare il cliente?"
          onDelete={() => handleDeleteCustomer(selectedClientId)}
          onCancel={() => setDelModal(false)}
        />
      )}
    </div>
  );
};

export default Clienti;

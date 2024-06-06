import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomModal from "../../components/CustomModal";
import SearchBar from "../../components/SearchBar";
import { useSelector } from "react-redux";

const Dispositivi = () => {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("model");
  const [sortConfig, setSortConfig] = useState({
    key: "model",
    direction: "ascending",
  });

  const { token } = useSelector((state) => state.auth);
  const fetchDevices = useCallback(async () => {
    if (!token) {
      return;
    }
    const response = await fetch("/api/devices", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella lsita dispositivi");
    }
    let data = await response.json();
    console.log(data.devices);
    setDevices(data.devices);
  }, [token]);

  const handleDelete = useCallback((brandIndex, modelIndex) => {
    setDevices((prevDevices) => {
      const updatedDevices = [...prevDevices];
      updatedDevices[brandIndex].models.splice(modelIndex, 1);
      return updatedDevices;
    });
    setSelectedModel(null);
    setShowModal(false);
  }, []);

  const confirmDelete = useCallback(() => {
    if (selectedModel) {
      const brandIndex = devices.findIndex(
        (brand) => brand.brand === selectedModel.brand
      );
      const modelIndex = devices[brandIndex].models.findIndex(
        (model) => model.model === selectedModel.model
      );
      handleDelete(brandIndex, modelIndex);
    }
  }, [selectedModel, devices, handleDelete]);

  const handleSearchTermChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSearchTypeChange = useCallback((e) => {
    setSearchType(e.target.value);
  }, []);

  const requestSort = useCallback((key) => {
    setSortConfig((prevSortConfig) => {
      let direction = "ascending";
      if (
        prevSortConfig.key === key &&
        prevSortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      return { key, direction };
    });
  }, []);

  const getSortIcon = useCallback(
    (key) => {
      if (sortConfig.key === key) {
        return sortConfig.direction === "ascending" ? " ▲" : " ▼";
      }
      return null;
    },
    [sortConfig]
  );
  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);
  return (
    <div className="container mt-3 mb-2">
      <h2>Modelli</h2>
      <div className="mt-3 mb-4 d-flex justify-content-between">
        <Link to="/aggiungi-modello" className="btn btn-primary">
          + Aggiungi modello
        </Link>
        <SearchBar
          searchFields={{ model: "Modello", brand: "Brand" }}
          selectedSearchField={searchType}
          onSearchFieldChange={handleSearchTypeChange}
          searchQuery={searchTerm}
          onSearchQueryChange={handleSearchTermChange}
        />
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" onClick={() => requestSort("brand")}>
              Brand {getSortIcon("brand")}
            </th>
            <th scope="col" onClick={() => requestSort("model")}>
              Modello {getSortIcon("model")}
            </th>
            <th scope="col" className="text-center" style={{ width: "1%" }}>
              Modifica
            </th>
            <th scope="col" className="text-center" style={{ width: "1%" }}>
              Elimina
            </th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={`${device._id}`}>
              <td className="align-middle">{device.marca}</td>
              <td className="align-middle">{device.modello}</td>
              <td className="text-center align-middle">
                <Link
                  to={`/dettagli-modello/${encodeURIComponent(
                    device.marca
                  )}/${encodeURIComponent(device.modello)}`}
                  className="btn btn-warning btn-sm"
                >
                  Modifica
                </Link>
              </td>
              <td className="text-center align-middle">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setSelectedModel({
                      ...device.modello,
                      brand: device.marca,
                    });
                    setShowModal(true);
                  }}
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
        body={`Sei sicuro di voler eliminare il modello ${
          selectedModel ? selectedModel.model : ""
        }?`}
        onConfirm={confirmDelete}
        confirmText="Elimina"
        cancelText="Annulla"
      />
    </div>
  );
};

export default Dispositivi;

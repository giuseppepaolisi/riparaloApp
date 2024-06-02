import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import deviceData from "../../assets/json/devices.json";
import CustomModal from "../../components/CustomModal";
import SearchBar from "../../components/SearchBar";

const Modello = () => {
  const [devices, setDevices] = useState(deviceData);
  const [showModal, setShowModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("model");
  const [sortConfig, setSortConfig] = useState({
    key: "model",
    direction: "ascending",
  });

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

  const sortedDevices = useMemo(() => {
    const sortableDevices = [...devices];
    if (sortConfig.key === "brand") {
      sortableDevices.sort(
        (a, b) =>
          a.brand.localeCompare(b.brand) *
          (sortConfig.direction === "ascending" ? 1 : -1)
      );
    } else {
      sortableDevices.forEach((brand) => {
        brand.models.sort(
          (a, b) =>
            a[sortConfig.key].localeCompare(b[sortConfig.key]) *
            (sortConfig.direction === "ascending" ? 1 : -1)
        );
      });
    }
    return sortableDevices;
  }, [devices, sortConfig]);

  const filteredDevices = useMemo(() => {
    return sortedDevices
      .map((brand) => {
        if (searchType === "brand") {
          if (brand.brand.toLowerCase().startsWith(searchTerm.toLowerCase())) {
            return brand;
          } else {
            return { ...brand, models: [] };
          }
        } else {
          const filteredModels = brand.models.filter((model) =>
            model.model.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
          return { ...brand, models: filteredModels };
        }
      })
      .filter((brand) => brand.models.length > 0);
  }, [sortedDevices, searchTerm, searchType]);

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
          {filteredDevices.map((brand, brandIndex) =>
            brand.models.map((model, modelIndex) => (
              <tr key={`${brandIndex}-${modelIndex}`}>
                {modelIndex === 0 && (
                  <td rowSpan={brand.models.length} className="align-middle">
                    {brand.brand}
                  </td>
                )}
                <td className="align-middle">{model.model}</td>
                <td className="text-center align-middle">
                  <Link
                    to={`/dettagli-modello/${encodeURIComponent(
                      brand.brand
                    )}/${encodeURIComponent(model.model)}`}
                    className="btn btn-warning btn-sm"
                  >
                    Modifica
                  </Link>
                </td>
                <td className="text-center align-middle">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setSelectedModel({ ...model, brand: brand.brand });
                      setShowModal(true);
                    }}
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))
          )}
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

export default Modello;

import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ModularTable from "./ModularTable";
import CustomModal from "./CustomModal";

const EntityDashboard = ({
  entityData,
  entityType,
  tableHeaders,
  searchFields,
  linkToAdd,
  onRowClick,
}) => {
  const [entities, setEntities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState(Object.keys(searchFields)[0]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    setEntities(entityData);
  }, [entityData]);

  const handleDelete = useCallback(
    (id) => {
      const updatedEntities = entities.filter((entity) => entity.id !== id);
      setEntities(updatedEntities);
      setShowModal(false);
    },
    [entities]
  );

  const confirmDelete = useCallback(() => {
    if (selectedEntity) {
      handleDelete(selectedEntity.id);
    }
  }, [selectedEntity, handleDelete]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const filteredEntities = entities.filter((entity) =>
    entity[searchType]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mt-3 mb-4">
      <h2>{entityType}</h2>
      <div className="mt-3 mb-5 d-flex justify-content-between">
        <Link to={linkToAdd} className="btn btn-primary">
          + Aggiungi {entityType.toLowerCase()}
        </Link>
        <SearchBar
          searchFields={searchFields}
          selectedSearchField={searchType}
          onSearchFieldChange={handleSearchTypeChange}
          searchQuery={searchTerm}
          onSearchQueryChange={handleSearchTermChange}
        />
      </div>
      <ModularTable
        headers={tableHeaders}
        data={filteredEntities}
        onRead={(entity) => onRowClick(entity.id)}
        onDelete={(id) => {
          setSelectedEntity(entities.find((entity) => entity.id === id));
          setShowModal(true);
        }}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Conferma Eliminazione"
        body={`Sei sicuro di voler eliminare questo ${entityType.toLowerCase()}?`}
        onConfirm={confirmDelete}
        confirmText="Elimina"
        cancelText="Annulla"
      />
    </div>
  );
};

EntityDashboard.propTypes = {
  entityData: PropTypes.arrayOf(PropTypes.object).isRequired,
  entityType: PropTypes.string.isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchFields: PropTypes.objectOf(PropTypes.string).isRequired,
  linkToAdd: PropTypes.string.isRequired,
  onRowClick: PropTypes.func,
};

export default EntityDashboard;

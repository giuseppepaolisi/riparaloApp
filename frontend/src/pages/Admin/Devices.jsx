import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/Table/Table";
import DeleteButton from "../../components/Action/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import EditButton from "../../components/Action/EditButton";
import DetailButton from "../../components/Action/DetailButton";
import AddButton from "../../components/Action/AddButton";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });

  // ottieni il token
  const { token } = useSelector((state) => state.auth);

  // Chiamata API per la lista dispositivi
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
      throw new Error("Errore nella lista dispositivi");
    }
    let data = await response.json();
    console.log(data.devices);
    setDevices(data.devices);
  }, [token]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item });
  };

  const confirmDelete = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

  const actions = [
    () => <DetailButton onClick={() => null} />,
    () => <EditButton onClick={() => null} />,
    ({ item }) => <DeleteButton onClick={() => handleDelete(item)} />,
  ];

  const headers = ["Marca", "Modello"];
  const columns = ["marca", "modello"];

  return (
    <div className="container mt-3 mb-4">
      {/* Page Heading */}
      <h2 className="h3 mb-2 text-gray-800">Dispositivi</h2>
      <div className="row ">
        <div className="mt-3 mb-5 d-flex justify-content-between">
          <AddButton label="Dispositivo" link="/aggiungi-modello" />
        </div>
      </div>
      {/* DataTables Example */}
      <Table
        headers={headers}
        data={devices}
        columns={columns}
        actions={actions}
      />
      {deleteModal.isOpen && (
        <DeleteModal
          message={`Sei sicuro di voler eliminare ${deleteModal.item.marca} ${deleteModal.item.modello}?`}
          onDelete={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Devices;

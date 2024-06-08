/** @jsxImportSource @emotion/react */
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import AddButton from "../../components/Action/AddButton";
import DeleteButton from "../../components/Action/DeleteButton";
import DeleteModal from "../../components/DeleteModal";
import EditButton from "../../components/Action/EditButton";
import DetailButton from "../../components/Action/DetailButton";
import Table from "../../components/Table/Table";
import Loading from "../../components/Loading";
import CustomAlert from "../../components/Alert/CustomAlert";
import { useNavigate } from "react-router-dom";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const navigate = useNavigate();

  // ottieni il token
  const { token } = useSelector((state) => state.auth);

  // Chiamata API per la lista dispositivi
  const fetchDevices = useCallback(async () => {
    if (!token) {
      return;
    }
    console.log("Fetching devices...");
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
    console.log("Devices fetched:", data.devices);
    setDevices(data.devices);
    setLoading(false); // Imposta loading su false dopo aver caricato i dati
  }, [token]);

  useEffect(() => {
    fetchDevices().catch(console.error);
  }, [fetchDevices]);

  const handleDelete = (item) => {
    console.log("Delete clicked for item:", item);
    setDeleteModal({ isOpen: true, item });
  };

  const confirmDelete = useCallback(async () => {
    try {
      if (!token) {
        return;
      }
      console.log("Confirming delete for item:", deleteModal.item);
      const response = await fetch(`/api/device/${deleteModal.item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore eliminazione dispositivo");
      }
      setDevices((devices) =>
        devices.filter((device) => device._id !== deleteModal.item._id)
      );
      setAlert({
        open: true,
        msg: "Dispositivo eliminato con successo",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore eliminazione dispositivo",
        severity: "error",
      });
    }
    setDeleteModal({ isOpen: false, item: null });
  }, [token, deleteModal]);

  const cancelDelete = () => {
    console.log("Cancel delete");
    setDeleteModal({ isOpen: false, item: null });
  };

  const handleDetail = (item) => {
    console.log("Detail clicked for item:", item);
    // Implementa la logica per il dettaglio
  };

  const handleEdit = (item) => {
    navigate(`/modifica-modello/${item._id}`);
  };

  const columns = [
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "modello", headerName: "Modello", flex: 1 },
    {
      field: "action",
      headerName: "Azioni",
      flex: 1,
      renderCell: (params) => (
        <div>
          <DetailButton onClick={() => handleDetail(params.row)} />
          <EditButton onClick={() => handleEdit(params.row)} />
          <DeleteButton onClick={() => handleDelete(params.row)} />
        </div>
      ),
    },
  ];

  const searchFields = ["marca", "modello"];

  return (
    <div className="container mt-3 mb-4">
      <h2 className="h3 mb-2 text-gray-800">Dispositivi</h2>
      {loading ? ( // Mostra il componente di caricamento se loading è true
        <Loading open={loading} />
      ) : (
        <>
          <Table
            columns={columns}
            rows={devices}
            actions={<AddButton label="Dispositivo" link="/aggiungi-modello" />}
            searchFields={searchFields}
          />
          {deleteModal.isOpen && (
            <DeleteModal
              message={`Sei sicuro di voler eliminare ${deleteModal.item.marca} ${deleteModal.item.modello}?`}
              onDelete={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
          {alert.open && (
            <CustomAlert msg={alert.msg} severity={alert.severity} />
          )}
        </>
      )}
    </div>
  );
};

export default Devices;

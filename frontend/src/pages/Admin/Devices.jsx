/** @jsxImportSource @emotion/react */
import React, { useState, useCallback, useEffect } from "react";
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
import DeviceDetailModal from "../../components/Modal/DeviceDetailModal";
import { Typography } from "@mui/material";
import usePageTitle from "../../CustomHooks/usePageTitle";
import {
  fetchDevices,
  deleteDevice,
  fetchDeviceDetails,
} from "../../api/apiAdmin";

const Devices = () => {
  usePageTitle("Dispositivi");
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    device: null,
  });
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const loadDevices = useCallback(async () => {
    if (!token) return;
    try {
      const data = await fetchDevices(token);
      setDevices(data.devices);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: error.message,
        severity: "error",
      });
    }
  }, [token]);

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item });
  };

  const confirmDelete = useCallback(async () => {
    try {
      if (!token) return;
      await deleteDevice(token, deleteModal.item._id);
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
        msg: error.message,
        severity: "error",
      });
    }
    setDeleteModal({ isOpen: false, item: null });
  }, [token, deleteModal.item]);

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

  const handleDetail = async (item) => {
    try {
      if (!token) return;
      const data = await fetchDeviceDetails(token, item._id);
      setDetailModal({ isOpen: true, device: data.device });
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: error.message,
        severity: "error",
      });
    }
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
    <React.Fragment>
      <div className="container mt-3 mb-4">
        <Typography variant="h3" gutterBottom className="mb-2 text-gray-800">
          Dispositivi
        </Typography>
        {loading ? (
          <Loading open={loading} />
        ) : (
          <>
            <Table
              columns={columns}
              rows={devices}
              actions={
                <AddButton label="Dispositivo" link="/aggiungi-modello" />
              }
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
            {detailModal.isOpen && (
              <DeviceDetailModal
                open={detailModal.isOpen}
                onClose={() => setDetailModal({ isOpen: false, device: null })}
                device={detailModal.device}
              />
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Devices;

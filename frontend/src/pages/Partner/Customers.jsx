import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchClienti,
  deleteCliente,
  fetchClienteById,
} from "../../api/apiPartner";
import AddButton from "../../components/Action/AddButton";
import DeleteButton from "../../components/Action/DeleteButton";
import EditButton from "../../components/Action/EditButton";
import DetailButton from "../../components/Action/DetailButton";
import Table from "../../components/Table/Table";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/Modal/DeleteModal";
import CustomAlert from "../../components/Alert/CustomAlert";
import CustomerDetailModal from "../../components/Modal/CustomerDetailModal";
import usePageTitle from "../../CustomHooks/usePageTitle";

const Customers = () => {
  usePageTitle("Clienti");

  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    customer: null,
  });
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const loadClienti = useCallback(async () => {
    if (!token) return;
    try {
      const users = await fetchClienti(token);
      setClienti(users);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  useEffect(() => {
    loadClienti();
  }, [loadClienti]);

  const handleDeleteCliente = useCallback(async (id) => {
    setDeleteModal({ isOpen: true, item: id });
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await deleteCliente(token, deleteModal.item);
      setClienti((prevClienti) =>
        prevClienti.filter((cliente) => cliente._id !== deleteModal.item)
      );
      setAlert({
        open: true,
        msg: "Cliente eliminato con successo",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore eliminazione cliente",
        severity: "error",
      });
    }
    setDeleteModal({ isOpen: false, item: null });
  }, [token, deleteModal.item]);

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

  const handleDetail = async (id) => {
    try {
      if (!token) return;
      const data = await fetchClienteById(token, id);
      setDetailModal({ isOpen: true, customer: data });
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore nel recupero del cliente",
        severity: "error",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/modifica-cliente/${id}`);
  };

  const columns = [
    { field: "telefono", headerName: "Telefono", flex: 1 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "cognome", headerName: "Cognome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "action",
      headerName: "Azioni",
      flex: 1,
      renderCell: (params) => (
        <div>
          <DetailButton onClick={() => handleDetail(params.row._id)} />
          <EditButton onClick={() => handleEdit(params.row._id)} />
          <DeleteButton onClick={() => handleDeleteCliente(params.row._id)} />
        </div>
      ),
    },
  ];

  const searchFields = ["telefono", "nome", "cognome", "email"];

  return (
    <React.Fragment>
      {loading ? (
        <Loading open={loading} />
      ) : (
        <>
          <Table
            columns={columns}
            rows={clienti}
            actions={<AddButton label="Cliente" link="/aggiungi-cliente" />}
            searchFields={searchFields}
          />
          {deleteModal.isOpen && (
            <DeleteModal
              message={`Sei sicuro di voler eliminare questo cliente?`}
              onDelete={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
          {alert.open && (
            <CustomAlert msg={alert.msg} severity={alert.severity} />
          )}
          {detailModal.isOpen && (
            <CustomerDetailModal
              open={detailModal.isOpen}
              onClose={() => setDetailModal({ isOpen: false, customer: null })}
              customer={detailModal.customer}
            />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Customers;

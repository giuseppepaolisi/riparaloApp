import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchTecnici,
  deleteTecnico,
  fetchTecnicoById,
} from "../../api/apiTecnico";
import AddButton from "../../components/Action/AddButton";
import DeleteButton from "../../components/Action/DeleteButton";
import EditButton from "../../components/Action/EditButton";
import DetailButton from "../../components/Action/DetailButton";
import Table from "../../components/Table/Table";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import CustomAlert from "../../components/Alert/CustomAlert";
import TecnicoDetailModal from "../../components/Modal/TecnicoDetailModal";
import { Typography } from "@mui/material";

const Tecnici = () => {
  const [tecnici, setTecnici] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    tecnico: null,
  });
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const loadTecnici = useCallback(async () => {
    if (!token) return;
    try {
      const users = await fetchTecnici(token);
      setTecnici(users);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  useEffect(() => {
    loadTecnici();
  }, [loadTecnici]);

  const handleDeleteTecnico = useCallback(async (id) => {
    setDeleteModal({ isOpen: true, item: id });
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await deleteTecnico(token, deleteModal.item);
      setTecnici((prevTecnici) =>
        prevTecnici.filter((tecnico) => tecnico._id !== deleteModal.item)
      );
      setAlert({
        open: true,
        msg: "Tecnico eliminato con successo",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore eliminazione tecnico",
        severity: "error",
      });
    }
    setDeleteModal({ isOpen: false, item: null });
  }, [token, deleteModal.item]);

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

  const handleDetail = async (id) => {
    if (!token) return;
    try {
      const tecnico = await fetchTecnicoById(token, id);
      setDetailModal({ isOpen: true, tecnico });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/modifica-tecnico/${id}`);
  };

  const columns = [
    { field: "cognome", headerName: "Cognome", flex: 1 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "action",
      headerName: "Azioni",
      flex: 1,
      renderCell: (params) => (
        <div>
          <DetailButton onClick={() => handleDetail(params.row._id)} />
          <EditButton onClick={() => handleEdit(params.row._id)} />
          <DeleteButton onClick={() => handleDeleteTecnico(params.row._id)} />
        </div>
      ),
    },
  ];

  const searchFields = ["cognome", "nome", "email"];

  return (
    <div className="container mt-3 mb-4">
      <Typography variant="h3" gutterBottom className="mb-2 text-gray-800">
        Tecnici
      </Typography>
      {loading ? (
        <Loading open={loading} />
      ) : (
        <>
          <Table
            columns={columns}
            rows={tecnici}
            actions={<AddButton label="Tecnico" link="/aggiungi-tecnico" />}
            searchFields={searchFields}
          />
          {deleteModal.isOpen && (
            <DeleteModal
              message={`Sei sicuro di voler eliminare questo tecnico?`}
              onDelete={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
          {detailModal.isOpen && (
            <TecnicoDetailModal
              open={detailModal.isOpen}
              onClose={() => setDetailModal({ isOpen: false, tecnico: null })}
              tecnico={detailModal.tecnico}
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

export default Tecnici;

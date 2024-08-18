import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  fetchTecnici,
  deleteTecnico,
  fetchTecnicoById,
} from "../../api/apiAdmin";
import AddButton from "../../components/Action/AddButton";
import DeleteButton from "../../components/Action/DeleteButton";
import DetailButton from "../../components/Action/DetailButton";
import Table from "../../components/Table/Table";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/Modal/DeleteModal";
import CustomAlert from "../../components/Alert/CustomAlert";
import TecnicoDetailModal from "../../components/Modal/TecnicoDetailModal";
import usePageTitle from "../../CustomHooks/usePageTitle";

const Technicians = () => {
  usePageTitle("Tecnici");
  const [tecnici, setTecnici] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    tecnico: null,
  });
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { token } = useSelector((state) => state.auth);

  const loadTecnici = useCallback(async () => {
    if (!token) return;
    try {
      const users = await fetchTecnici(token);
      setTecnici(users);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setAlert({
        open: true,
        msg: "Errore nel caricamento dei tecnici",
        severity: "error",
      });
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
      console.log("Tecnico fetched:", tecnico);
      setDetailModal({ isOpen: true, tecnico });
    } catch (error) {
      console.error(error.message);
      setAlert({
        open: true,
        msg: "Errore nel recupero del tecnico",
        severity: "error",
      });
    }
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
          <DeleteButton onClick={() => handleDeleteTecnico(params.row._id)} />
        </div>
      ),
    },
  ];

  const searchFields = ["cognome", "nome", "email"];

  return (
    <React.Fragment>
      <div className="container mt-3 mb-4">
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
              <CustomAlert
                msg={alert.msg}
                severity={alert.severity}
                onClose={() => setAlert({ ...alert, open: false })}
              />
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Technicians;

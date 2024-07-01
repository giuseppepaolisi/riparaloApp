import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  fetchPartners,
  deletePartner,
  fetchPartnerById,
} from "../../api/apiAdmin";
import AddButton from "../../components/Action/AddButton";
import DeleteButton from "../../components/Action/DeleteButton";
import DetailButton from "../../components/Action/DetailButton";
import Table from "../../components/Table/Table";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import CustomAlert from "../../components/Alert/CustomAlert";
import PartnerDetailModal from "../../components/Modal/PartnerDetailModal";
import usePageTitle from "../../CustomHooks/usePageTitle";

const Partners = () => {
  usePageTitle("Partners");
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    partner: null,
  });
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { token } = useSelector((state) => state.auth);

  const loadPartners = useCallback(async () => {
    if (!token) return;
    try {
      const users = await fetchPartners(token);
      setPartners(users);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  const handleDeletePartner = useCallback(async (id) => {
    setDeleteModal({ isOpen: true, item: id });
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      await deletePartner(token, deleteModal.item);
      setPartners((prevPartners) =>
        prevPartners.filter((partner) => partner._id !== deleteModal.item)
      );
      setAlert({
        open: true,
        msg: "Partner eliminato con successo",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore eliminazione partner",
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
      const partner = await fetchPartnerById(token, id);
      console.log("Partner fetched:", partner); // Aggiungi questo log
      setDetailModal({ isOpen: true, partner });
    } catch (error) {
      console.error(error.message);
    }
  };

  const columns = [
    { field: "ragioneSociale", headerName: "Rag. Sociale", flex: 1 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "provincia", headerName: "Provincia", flex: 1 },
    {
      field: "action",
      headerName: "Azioni",
      flex: 1,
      renderCell: (params) => (
        <div>
          <DetailButton onClick={() => handleDetail(params.row._id)} />
          <DeleteButton onClick={() => handleDeletePartner(params.row._id)} />
        </div>
      ),
    },
  ];

  const searchFields = ["ragioneSociale", "nome", "email", "provincia"];

  return (
    <React.Fragment>
      <div className="container mt-3 mb-4">
        {loading ? (
          <Loading open={loading} />
        ) : (
          <>
            <Table
              columns={columns}
              rows={partners}
              actions={<AddButton label="Partner" link="/aggiungi-partner" />}
              searchFields={searchFields}
            />
            {deleteModal.isOpen && (
              <DeleteModal
                message={`Sei sicuro di voler eliminare questo partner?`}
                onDelete={confirmDelete}
                onCancel={cancelDelete}
              />
            )}
            {detailModal.isOpen && (
              <PartnerDetailModal
                open={detailModal.isOpen}
                onClose={() => setDetailModal({ isOpen: false, partner: null })}
                partner={detailModal.partner}
              />
            )}
            {alert.open && (
              <CustomAlert msg={alert.msg} severity={alert.severity} />
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Partners;

import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import TicketTable from "./TicketTable";
import AddButton from "../Action/AddButton";
import DetailButton from "../Action/DetailButton";
import EditButton from "../Action/EditButton";
import DeleteButton from "../Action/DeleteButton";
import StatusFilterButtons from "../Button/StatusFilterButtons";
import { fetchTicketsByState, deleteTicket } from "../../api/apiPartner";
import DeleteModal from "../Modal/DeleteModal";
import CustomAlert from "../Alert/CustomAlert";

const TicketDashboard = ({
  fetchTickets,
  columns,
  searchFields,
  addTicketLink,
  showAddButton,
  filterStatuses,
  alignSearchWithFilters,
  showEditButton,
  showDeleteButton,
  showDeleteButtonOnlyOpen,
  onDetail,
}) => {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTicketId, setDeleteTicketId] = useState(null);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchTicketsData = useCallback(async () => {
    try {
      let data;
      if (statusFilter) {
        data = await fetchTicketsByState(token, statusFilter);
      } else {
        data = await fetchTickets(token);
      }
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }, [token, statusFilter, fetchTickets]);

  useEffect(() => {
    if (token) {
      fetchTicketsData();
    }
  }, [token, statusFilter, fetchTicketsData]);

  const handleDetail = useCallback(
    (id) => {
      onDetail(id);
    },
    [onDetail]
  );

  const handleEdit = useCallback(
    (id) => {
      navigate(`/modifica-ticket/${id}`);
    },
    [navigate]
  );

  const handleDeleteRequest = useCallback((id) => {
    setDeleteTicketId(id);
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
    setDeleteTicketId(null);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteTicket(token, deleteTicketId);
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== deleteTicketId)
      );
      setAlert({
        open: true,
        msg: "Ticket eliminato con successo!",
        severity: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        msg: "Errore nell'eliminazione del ticket",
        severity: "error",
      });
    } finally {
      setDeleteModalOpen(false);
      setDeleteTicketId(null);
    }
  }, [token, deleteTicketId]);

  const actionColumns = [
    ...columns,
    {
      field: "actions",
      headerName: "Azioni",
      flex: 1,
      renderCell: (params) => (
        <div>
          <DetailButton onClick={() => handleDetail(params.row._id)} />
          {showEditButton && (
            <EditButton onClick={() => handleEdit(params.row._id)} />
          )}
          {showDeleteButton &&
            (!showDeleteButtonOnlyOpen || params.row.stato === "Aperto") && (
              <DeleteButton
                onClick={() => handleDeleteRequest(params.row._id)}
              />
            )}
        </div>
      ),
    },
  ];

  const handleFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mt-3 mb-4">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <StatusFilterButtons
          statuses={filterStatuses}
          onFilterChange={handleFilterChange}
        />
        {alignSearchWithFilters && (
          <TextField
            label="Cerca"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ marginLeft: "auto" }}
          />
        )}
      </Box>
      <TicketTable
        columns={actionColumns}
        rows={tickets}
        actions={
          !alignSearchWithFilters &&
          showAddButton && (
            <AddButton label="Apri Ticket" link={addTicketLink} />
          )
        }
        searchFields={searchFields}
        customStyles={!alignSearchWithFilters ? { marginLeft: "auto" } : {}}
        statusFilter={statusFilter}
        searchTerm={searchTerm}
        showSearchBar={!alignSearchWithFilters}
        setSearchTerm={setSearchTerm}
        onDetail={handleDetail}
      />
      {deleteModalOpen && (
        <DeleteModal
          message="Vuoi davvero eliminare questo ticket?"
          onDelete={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
      {alert.open && (
        <CustomAlert
          msg={alert.msg}
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
        />
      )}
    </div>
  );
};

TicketDashboard.propTypes = {
  fetchTickets: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      flex: PropTypes.number,
      renderCell: PropTypes.func,
    })
  ).isRequired,
  searchFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  addTicketLink: PropTypes.string.isRequired,
  showAddButton: PropTypes.bool,
  filterStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      filterValue: PropTypes.string.isRequired,
    })
  ).isRequired,
  alignSearchWithFilters: PropTypes.bool,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showDeleteButtonOnlyOpen: PropTypes.bool,
  onDetail: PropTypes.func,
};

TicketDashboard.defaultProps = {
  showAddButton: false,
  alignSearchWithFilters: false,
  showEditButton: true,
  showDeleteButton: true,
  showDeleteButtonOnlyOpen: false,
  onDetail: () => {},
};

export default TicketDashboard;

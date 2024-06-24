import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box, TextField } from "@mui/material";
import TicketTable from "./TicketTable";
import AddButton from "../Action/AddButton";
import DetailButton from "../Action/DetailButton";
import EditButton from "../Action/EditButton";
import DeleteButton from "../Action/DeleteButton";
import StatusFilterButtons from "../../components/StatusFilterButtons";
import { fetchTicketsByState, deleteTicket } from "../../api/apiPartner";

const TicketDashboard = ({
  title,
  fetchTickets,
  columns,
  searchFields,
  addTicketLink,
  showAddButton,
  filterStatuses,
  alignSearchWithFilters,
}) => {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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
      navigate(`/ticket/${id}`);
    },
    [navigate]
  );

  const handleEdit = useCallback(
    (id) => {
      navigate(`/modifica-ticket/${id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteTicket(token, id);
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket._id !== id)
        );
      } catch (error) {
        console.error("Error deleting ticket:", error);
      }
    },
    [token]
  );

  const actionColumns = [
    ...columns,
    {
      field: "actions",
      headerName: "Azioni",
      flex: 1,
      renderCell: (params) => (
        <div>
          <DetailButton onClick={() => handleDetail(params.row._id)} />
          <EditButton onClick={() => handleEdit(params.row._id)} />
          <DeleteButton onClick={() => handleDelete(params.row._id)} />
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
      <Typography variant="h3" gutterBottom className="mb-2 text-gray-800">
        {title}
      </Typography>
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
      />
    </div>
  );
};

TicketDashboard.propTypes = {
  title: PropTypes.string.isRequired,
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
};

TicketDashboard.defaultProps = {
  showAddButton: false,
  alignSearchWithFilters: false,
};

export default TicketDashboard;

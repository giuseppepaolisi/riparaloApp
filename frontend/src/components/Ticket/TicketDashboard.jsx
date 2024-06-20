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

  useEffect(() => {
    const fetchTicketsData = async () => {
      try {
        const data = await fetchTickets(token);
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    if (token) {
      fetchTicketsData();
    }
  }, [token, fetchTickets]);

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

  const handleDelete = useCallback((id) => {
    console.log(`Elimina ticket con ID: ${id}`);
  }, []);

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <StatusFilterButtons statuses={filterStatuses} onFilterChange={handleFilterChange} />
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
        actions={!alignSearchWithFilters && showAddButton && <AddButton label="Apri Ticket" link={addTicketLink} />}
        searchFields={searchFields}
        customStyles={!alignSearchWithFilters && { marginLeft: "auto" }} // Apply styles only when alignSearchWithFilters is false
        statusFilter={statusFilter}
        searchTerm={searchTerm} // Always pass searchTerm
        showSearchBar={!alignSearchWithFilters} // Pass prop to show or hide search bar in TicketTable
        setSearchTerm={setSearchTerm} // Pass setSearchTerm as a prop
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
  alignSearchWithFilters: PropTypes.bool, // Add this prop
};

TicketDashboard.defaultProps = {
  showAddButton: false,
  alignSearchWithFilters: false, // Default to false
};

export default TicketDashboard;

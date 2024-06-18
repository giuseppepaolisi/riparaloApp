import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import TicketTable from "./TicketTable";
import AddButton from "../Action/AddButton";
import DetailButton from "../Action/DetailButton";
import EditButton from "../Action/EditButton";
import DeleteButton from "../Action/DeleteButton";

const TicketDashboard = ({
  title,
  fetchTickets,
  columns,
  searchFields,
  addTicketLink,
}) => {
  const [tickets, setTickets] = useState([]);
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

  return (
    <div className="container mt-3 mb-4">
      <Typography variant="h3" gutterBottom className="mb-2 text-gray-800">
        {title}
      </Typography>
      <TicketTable
        columns={actionColumns}
        rows={tickets}
        actions={<AddButton label="Apri Ticket" link={addTicketLink} />}
        searchFields={searchFields}
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
};

export default TicketDashboard;

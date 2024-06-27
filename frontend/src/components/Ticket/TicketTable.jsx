import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box, Typography } from "@mui/material";
import { css } from "@emotion/react";

const TicketTable = ({
  columns,
  rows,
  actions,
  searchFields,
  customStyles,
  statusFilter,
  searchTerm,
  showSearchBar,
  setSearchTerm,
}) => {
  const [filteredRows, setFilteredRows] = useState([]);

  const filterRows = useCallback(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const regexSearch = new RegExp(
      lowerCaseSearchTerm.replace(/\s+/g, ".*"),
      "i"
    );
    const filtered = rows.filter((row) => {
      const matchesSearch = searchFields.some((field) =>
        regexSearch.test(row[field]?.toString().toLowerCase())
      );
      const matchesStatus = statusFilter
        ? row.stato.toLowerCase().includes(statusFilter.toLowerCase())
        : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredRows(filtered);
  }, [rows, searchTerm, searchFields, statusFilter]);

  useEffect(() => {
    filterRows();
  }, [rows, searchTerm, statusFilter, filterRows]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={3}>
        {actions}
        {showSearchBar && (
          <TextField
            label="Cerca"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Usa setSearchTerm passato come prop
            css={css`
              width: 25%;
            `}
            sx={{ ...customStyles }}
          />
        )}
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        {filteredRows.length} risultati
      </Typography>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row._id || row.id} // Specifica un id unico
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[20, 50]}
        autoHeight
        sx={{
          fontFamily: "Montserrat, sans-serif",
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
};

TicketTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      flex: PropTypes.number,
      renderCell: PropTypes.func,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.node,
  searchFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  customStyles: PropTypes.object,
  statusFilter: PropTypes.string, // Add statusFilter prop
  searchTerm: PropTypes.string, // Add searchTerm prop
  showSearchBar: PropTypes.bool, // Add showSearchBar prop
  setSearchTerm: PropTypes.func, // Add setSearchTerm prop
};

TicketTable.defaultProps = {
  customStyles: {},
  statusFilter: "", // Default statusFilter to an empty string
  searchTerm: "", // Default searchTerm to an empty string
  showSearchBar: true, // Default to true
  setSearchTerm: () => {}, // Default to an empty function
};

export default TicketTable;

import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box } from "@mui/material";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

const Table = ({ columns, rows, actions, searchFields }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilteredRows(
      rows.filter((row) =>
        searchFields.some((field) => row[field]?.toString().includes(value))
      )
    );
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={3}>
        {actions}
        <TextField
          label="Cerca"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          css={css`
            width: 25%;
          `}
          sx={{ fontFamily: "Montserrat, sans-serif" }} // Applica il font alla TextField
        />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[20, 50]}
        autoHeight
        sx={{ fontFamily: "Montserrat, sans-serif" }} // Applica il font alla DataGrid
      />
    </div>
  );
};

Table.propTypes = {
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
};

export default Table;

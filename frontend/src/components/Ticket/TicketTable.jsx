import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box } from "@mui/material";
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
            onChange={(e) => setSearchTerm(e.target.value)}
            css={css`
              width: 25%;
            `}
            sx={{ ...customStyles }}
          />
        )}
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row._id || row.id}
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
            fontWeight: 'bold',
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 'bold',
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
  statusFilter: PropTypes.string,
  searchTerm: PropTypes.string,
  showSearchBar: PropTypes.bool,
  setSearchTerm: PropTypes.func,
};

TicketTable.defaultProps = {
  customStyles: {},
  statusFilter: "",
  searchTerm: "",
  showSearchBar: true,
  setSearchTerm: () => {},
};

export default TicketTable;

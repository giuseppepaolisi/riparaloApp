import PropTypes from "prop-types";
import { memo, useCallback } from "react";

const SearchBar = memo(
  ({
    searchFields,
    selectedSearchField,
    onSearchFieldChange,
    searchQuery,
    onSearchQueryChange,
    onSearch,
  }) => {
    const handleSearchFieldChange = useCallback(
      (e) => {
        onSearchFieldChange(e.target.value);
        onSearch(searchQuery, e.target.value);
      },
      [onSearchFieldChange, onSearch, searchQuery]
    );

    const handleSearchQueryChange = useCallback(
      (e) => {
        onSearchQueryChange(e.target.value);
        onSearch(e.target.value, selectedSearchField);
      },
      [onSearchQueryChange, onSearch, selectedSearchField]
    );

    return (
      <div className="d-flex">
        <select
          className="form-select mx-2"
          value={selectedSearchField}
          onChange={handleSearchFieldChange}
        >
          {Object.entries(searchFields).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control"
          placeholder={`Cerca per ${searchFields[
            selectedSearchField
          ].toLowerCase()}`}
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

SearchBar.propTypes = {
  searchFields: PropTypes.object.isRequired,
  selectedSearchField: PropTypes.string.isRequired,
  onSearchFieldChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;

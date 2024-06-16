import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  fullWidth = true,
  margin = "normal",
}) => (
  <TextField
    id={id}
    label={label}
    type={type}
    value={value}
    onChange={onChange}
    required={required}
    fullWidth={fullWidth}
    margin={margin}
    variant="outlined"
  />
);

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
};

export default FormInput;

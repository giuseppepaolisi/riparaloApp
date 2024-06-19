import PropTypes from "prop-types";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormActions = ({
  onSubmit,
  submitLabel = "Invia",
  isSubmitDisabled = false,
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item>
        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
        >
          {submitLabel}
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="inherit" onClick={handleCancel}>
          Annulla
        </Button>
      </Grid>
    </Grid>
  );
};

FormActions.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  isSubmitDisabled: PropTypes.bool,
};

export default FormActions;

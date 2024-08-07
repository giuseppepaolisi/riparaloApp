/** @jsxImportSource @emotion/react */
import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const Loading = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

Loading.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default Loading;

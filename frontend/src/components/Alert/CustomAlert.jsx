import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function CustomAlert({ msg, severity, onClose }) {
  const duration = 6000;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity={severity}>
          <AlertTitle>{severity === "error" ? "Error" : "Success"}</AlertTitle>
          {msg}
        </Alert>
      </Stack>
    </div>
  );
}

CustomAlert.propTypes = {
  msg: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

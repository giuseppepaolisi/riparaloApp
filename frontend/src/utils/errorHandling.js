// frontend/src/utils/errorHandling.js

export function handleValidationError(validationFunction, value, errorMessage, setAlert) {
    if (!validationFunction(value)) {
      setAlert({
        open: true,
        msg: errorMessage,
        severity: "error",
      });
      return true;
    }
    return false;
  }
  
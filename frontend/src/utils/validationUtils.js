// src/utils/validationUtils.js

export const validateServicePrice = (price) => {
    if (isNaN(price) || price < 0) {
      return "Il prezzo del servizio deve essere un numero maggiore o uguale a 0.";
    }
    return "";
  };
  
  export const validateAcconto = (acconto, totalPrice) => {
    if (isNaN(acconto) || acconto < 0) {
      return "L'acconto deve essere un numero maggiore o uguale a 0.";
    }
    if (acconto > totalPrice) {
      return "L'acconto non può superare il valore totale dei servizi.";
    }
    return "";
  };
  
  export const validateIMEI = (imei) => {
    if (imei.length !== 15) {
      return "L'IMEI deve essere di 15 cifre.";
    }
    return "";
  };
  
  export const validateTelefono = (telefono) => {
    const telefonoRegex = /^\+?([0-9]{10,13})$/;
    if (!telefonoRegex.test(telefono)) {
      return "Il numero di telefono deve essere di 10-13 cifre, con un prefisso opzionale.";
    }
    return "";
  };
  
  export const validateForm = (formData) => {
    for (const service of formData.servizi) {
      const serviceError = validateServicePrice(service.prezzo);
      if (serviceError) {
        return serviceError;
      }
    }
  
    const totalPrice = formData.servizi.reduce((total, service) => total + parseFloat(service.prezzo || 0), 0);
    const accontoError = validateAcconto(formData.acconto, totalPrice);
    if (accontoError) {
      return accontoError;
    }
  
    const imeiError = validateIMEI(formData.imei);
    if (imeiError) {
      return imeiError;
    }
  
    const telefonoError = validateTelefono(formData.telefono_cliente);
    if (telefonoError) {
      return telefonoError;
    }
  
    return "";
  };
  
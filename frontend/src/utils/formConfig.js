// frontend/src/utils/formConfig.js

export const formFieldsConfig = (email, setEmail, nome, setNome, cognome, setCognome, telefono, setTelefono) => [
    {
      id: "email",
      label: "Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: "nome",
      label: "Nome",
      type: "text",
      value: nome,
      onChange: (e) => setNome(e.target.value),
    },
    {
      id: "cognome",
      label: "Cognome",
      type: "text",
      value: cognome,
      onChange: (e) => setCognome(e.target.value),
    },
    {
      id: "telefono",
      label: "Telefono",
      type: "tel",
      value: telefono,
      onChange: (e) => setTelefono(e.target.value),
      inputProps: { pattern: "^\\+?[0-9]{10,13}$" },
      onKeyPress: (e) => {
        if (!/[0-9+]/.test(e.key)) {
          e.preventDefault();
        }
      },
    },
  ];
  
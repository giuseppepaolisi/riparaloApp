// frontend/src/utils/formConfig.js
export const formFieldsConfig = (fields, setField, config) => {
  const defaultConfig = [
    {
      id: "telefono_cliente",
      label: "Telefono Cliente",
      type: "text",
      value: fields.telefono_cliente,
      onChange: (e) => setField("telefono_cliente")(e.target.value),
      required: true,
      inputProps: { pattern: "^\\+?[0-9]{10,13}$" },
    },
    {
      id: "nome_cliente",
      label: "Nome Cliente",
      type: "text",
      value: fields.nome_cliente,
      onChange: (e) => setField("nome_cliente")(e.target.value),
      required: true,
    },
    {
      id: "cognome_cliente",
      label: "Cognome Cliente",
      type: "text",
      value: fields.cognome_cliente,
      onChange: (e) => setField("cognome_cliente")(e.target.value),
      required: true,
    },
    {
      id: "descrizione_problema",
      label: "Descrizione Problema",
      type: "text",
      value: fields.descrizione_problema,
      onChange: (e) => setField("descrizione_problema")(e.target.value),
      required: true,
    },
    {
      id: "marca",
      label: "Marca",
      type: "text",
      value: fields.marca,
      onChange: (e) => setField("marca")(e.target.value),
      required: true,
    },
    {
      id: "modello",
      label: "Modello",
      type: "text",
      value: fields.modello,
      onChange: (e) => setField("modello")(e.target.value),
      required: true,
    },
    {
      id: "acconto",
      label: "Acconto",
      type: "number",
      value: fields.acconto,
      onChange: (e) => setField("acconto")(e.target.value),
      required: true,
      inputProps: { min: 0, step: "0.01" },
    },
    {
      id: "imei",
      label: "IMEI",
      type: "text",
      value: fields.imei,
      onChange: (e) => setField("imei")(e.target.value),
      required: true,
    },
    {
      id: "pin",
      label: "PIN",
      type: "text",
      value: fields.pin,
      onChange: (e) => setField("pin")(e.target.value),
      required: true,
    },
    {
      id: "seriale",
      label: "Seriale",
      type: "text",
      value: fields.seriale,
      onChange: (e) => setField("seriale")(e.target.value),
      required: true,
    },
  ];

  if (config && Array.isArray(config)) {
    return config.map((item) => {
      const defaultField = defaultConfig.find((field) => field.id === item.id);
      return defaultField
        ? { ...defaultField, ...item }
        : {
            ...item,
            value: fields[item.id],
            onChange: (e) => setField(item.id)(e.target.value),
          };
    });
  }

  return defaultConfig;
};

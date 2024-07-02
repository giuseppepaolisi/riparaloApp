import { useState } from 'react';

const useFormFields = (initialValues) => {
  const [fields, setFields] = useState(initialValues);

  const createFieldSetter = (fieldName) => (value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return [fields, createFieldSetter];
};

export default useFormFields;

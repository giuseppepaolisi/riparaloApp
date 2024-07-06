//------------------------------------------------------- API DEVICE -----------------------------------------------------------------------
export const addDevice = async (token, formData) => {
  const response = await fetch("/api/device", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.error || "Non è stato possibile aggiungere il dispositivo"
    );
  }
  return data;
};
export const fetchDevices = async (token) => {
  const response = await fetch("/api/devices", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Errore nella lista dispositivi");
  }
  return data;
};

export const fetchDevice = async (token, id) => {
  const response = await fetch(`/api/device/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Errore nel caricamento del dispositivo");
  }
  return data;
};

export const updateDevice = async (token, id, formData) => {
  const response = await fetch(`/api/device/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.error || "Non è stato possibile modificare il dispositivo"
    );
  }
  return data;
};

export const deleteDevice = async (token, deviceId) => {
  const response = await fetch(`/api/device/${deviceId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Errore eliminazione dispositivo");
  }
  return response;
};

export const fetchDeviceDetails = async (token, deviceId) => {
  const response = await fetch(`/api/device/${deviceId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Errore nel recupero dei dettagli del dispositivo");
  }
  return data;
};

//------------------------------------------------------- API PARTNER -----------------------------------------------------------------------
export const addPartner = async (token, partner) => {
  try {
    const response = await fetch("/api/user/signup/partner", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partner),
    });

    const text = await response.text();
    console.log("Server response:", text);

    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile aggiungere il partner"
      );
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchPartners = async (token) => {
  try {
    const response = await fetch("/api/users/partner", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei partner");
    }

    const json = await response.json();
    if (Array.isArray(json.users)) {
      return json.users;
    } else {
      throw new Error("La risposta del server non è un array");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePartner = async (token, id) => {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nell'eliminazione del partner");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchPartnerById = async (token, id) => {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("API response:", data);

    if (!response.ok) {
      throw new Error("Errore nel recupero del partner");
    }

    return data.user || data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePartner = async (token, id, updatedData) => {
  try {
    console.log("Dati inviati per l'aggiornamento:", updatedData);
    const response = await fetch(`/api/user/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const text = await response.text();
    console.log("Server response:", text);

    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile aggiornare il partner"
      );
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//------------------------------------------------------- API TECNICO -----------------------------------------------------------------------
export const addTecnico = async (token, tecnico) => {
  try {
    const response = await fetch("/api/user/signup/tecnico", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tecnico),
    });

    const text = await response.text();
    console.log("Server response:", text);

    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile aggiungere il tecnico"
      );
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchTecnicoById = async (token, id) => {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("API response:", data);

    if (!response.ok) {
      throw new Error("Errore nel recupero del tecnico");
    }

    return data.user || data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTecnico = async (token, id, updatedData) => {
  try {
    console.log("Dati inviati per l'aggiornamento:", updatedData);
    const response = await fetch(`/api/user/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const text = await response.text();
    console.log("Server response:", text);

    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile aggiornare il tecnico"
      );
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchTecnici = async (token) => {
  try {
    const response = await fetch("/api/users/tecnico", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei tecnici");
    }

    const json = await response.json();
    if (Array.isArray(json.users)) {
      return json.users;
    } else {
      throw new Error("La risposta del server non è un array");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTecnico = async (token, id) => {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nell'eliminazione del tecnico");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};



// api/apiAdmin.js
export const fetchBrands = async (token) => {
  const response = await fetch("/api/brands", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Errore nel recupero dei brand");
  }

  const data = await response.json();
  return data.brands;
};

export const fetchModelsByBrand = async (token, brand) => {
  const response = await fetch(`/api/devices/${brand}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Errore nel recupero dei modelli per il brand: ${brand}`);
  }

  const data = await response.json();
  return data.modelli;
};

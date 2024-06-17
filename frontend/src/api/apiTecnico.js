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

export const updateTecnico = async (token, id, updatedData) => {
  try {
    console.log("Dati inviati per l'aggiornamento:", updatedData); // Aggiungi questo log
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

export const fetchTecnicoById = async (token, id) => {
  try {
    console.log(`Fetching tecnico with ID: ${id}`); // Log ID tecnico
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero del tecnico");
    }

    const data = await response.json();
    return data.user; // Assicurati di ritornare l'oggetto utente
  } catch (error) {
    throw new Error(error.message);
  }
};

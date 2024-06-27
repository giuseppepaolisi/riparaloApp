//frontend/src/api/apiUser.js

// Recupera i dati di un utente specifico
export const getUserData = async (token, id) => {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei dati utente");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Aggiorna i dati di un utente specifico
export const updateUserData = async (token, id, updatedData) => {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const text = await response.text();
    const data = JSON.parse(text);
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile aggiornare i dati utente"
      );
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

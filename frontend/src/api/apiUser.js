export const fetchUserData = async (token, id) => {
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
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
    if (!response.ok) {
      const data = JSON.parse(text);
      throw new Error(data.error || "Non è stato possibile aggiornare i dati");
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error(error.message);
  }
};

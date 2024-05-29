export const fetchClienti = async (token) => {
  try {
    const response = await fetch("/api/customers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella lista clienti");
    }

    const json = await response.json();
    if (Array.isArray(json.customers)) {
      return json.customers;
    } else {
      throw new Error("La risposta del server non è un array");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCliente = async (token, cliente) => {
  try {
    const response = await fetch("/api/customer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile aggiungere il cliente"
      );
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCliente = async (token, id) => {
  try {
    const response = await fetch(`/api/customer/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nell'eliminazione del cliente");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// dashboardPartner ticket
export const fetchTickets = async (token) => {
  try {
    const response = await fetch("/api/tickets", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei ticket");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

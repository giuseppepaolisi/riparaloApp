// FUNZIONI PER I CLIENTI
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

// FUNZIONI PER I PARTNER
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

//FUNZIONI PER I TICKETS
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

    const json = await response.json();
    if (Array.isArray(json.tickets)) {
      return json.tickets;
    } else {
      throw new Error("La risposta del server non è un array");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchTicketsByState = async (token, stato) => {
  try {
    const response = await fetch(`/api/tickets/${stato}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Errore nel recupero dei ticket per stato: ${stato}`);
    }

    const json = await response.json();
    if (Array.isArray(json.tickets)) {
      return json.tickets;
    } else {
      throw new Error("La risposta del server non è un array");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTicket = async (token, id) => {
  try {
    const response = await fetch(`/api/ticket/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Errore nell'eliminazione del ticket");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};


// Nuova funzione per recuperare un ticket specifico
export const fetchTicketById = async (token, id) => {
  try {
    const response = await fetch(`/api/ticket/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero del ticket");
    }

    const data = await response.json();
    return data.ticket;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTicket = async (token, ticketData) => {
  try {
    console.log("Token:", token);
    console.log("Ticket Data:", JSON.stringify(ticketData, null, 2));

    const response = await fetch("/api/ticket", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    const text = await response.text();
    console.log("Server response:", text);

    if (!response.ok) {
      throw new Error("Errore nella creazione del ticket");
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//FUNZIONI PER SVILUPPO FUTURO (VISUALIZZAZIONE CLIENTI)
export const fetchClienteById = async (token, id) => {
  try {
    const response = await fetch(`/api/customer/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero del cliente");
    }

    const data = await response.json();
    return data.customer;
  } catch (error) {
    throw new Error(error.message);
  }
};





//FUNZIONI PER SVILUPPO FUTURO (VISUALIZZAZIONE PARTNER)
export const fetchPartnerById = async (token, id) => {
  try {
    const response = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero del partner");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//FUNZIONI PER SVILUPPO FUTURO (MODIFICA CLIENTI)
export const updateCliente = async (token, id, updatedData) => {
  try {
    const response = await fetch(`/api/customer/${id}`, {
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
        data.error || "Non è stato possibile aggiornare il cliente"
      );
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//API PER SVILUPPO FUTURO (MODIFICA PARTNER)
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

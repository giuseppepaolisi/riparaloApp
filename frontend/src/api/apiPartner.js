//------------------------------------------------------- API CLIENTE -----------------------------------------------------------------------
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
    console.log("Response text:", text);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${text}`);
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error(error.message);
  }
};

//------------------------------------------------------- API TICKET -----------------------------------------------------------------------
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
    console.log("Token:", token);
    console.log("Deleting ticket ID:", id);

    const response = await fetch(`/api/ticket/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Errore nella risposta del server:", errorData);
      throw new Error(errorData.error || "Errore nell'eliminazione del ticket");
    }
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw new Error(error.message);
  }
};

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

export const fetchTicketsByTechnician = async (token, email) => {
  try {
    const response = await fetch(`/api/tickets`, {
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
    if (!Array.isArray(json.tickets)) {
      throw new Error("La risposta del server non è un array");
    }
    const filteredTickets = json.tickets.filter((ticket) =>
      ticket.storico_stato.some((stato) => stato.tecnico === email)
    );

    return filteredTickets;
  } catch (error) {
    throw new Error(error.message);
  }
};

/*export const editTicket = async (token, { id, newstate }) => {
  try {
    const response = await fetch(`/api/ticket`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, newstate }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile modificare il ticket"
      );
    }
    return data.newTicket;
  } catch (error) {
    throw new Error(error.message);
  }
};*/
export const editTicket = async (
  token,
  { id, newstate, technicianId, extraServices }
) => {
  try {
    const response = await fetch(`/api/ticket`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, newstate, technicianId, extraServices }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error || "Non è stato possibile modificare il ticket"
      );
    }
    return data.newTicket;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const downloadPDF = async (token, ticket) => {
  const response = await fetch(`/api/pdf/${ticket._id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Errore nel download del PDF");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ticket._id}-ticket.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const viewPDF = async (token, ticketId) => {
  try {
    const response = await fetch(`/api/pdf/${ticketId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella visualizzazione del PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Errore nella visualizzazione del PDF:", error);
  }
};

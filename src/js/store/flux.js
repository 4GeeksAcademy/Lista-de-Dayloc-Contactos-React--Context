const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      agendas: [],
    },
    actions: {
      getAgendas: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch agendas");
          }
          const agendasJson = await response.json();
          setStore((prevStore) => ({
            ...prevStore,
            agendas: agendasJson,
          }));
          return agendasJson;
        } catch (error) {
          console.error("Error fetching agendas:", error);
          throw error;
        }
      },
      postAgenda: async (agendasslug) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendasslug}`,
            {
              method: "POST",
            }
          );
          if (response.ok) {
            const newAgendaJson = await response.json();
            const agendas = getStore().agendas;
            const newAgendas = [...agendas, newAgendaJson];
            setStore({ agendas: newAgendas });
            console.log("Se ha creado la nueva agenda de contactos con éxito");
            window.location.reload();
          } else {
            console.error("No se pudo crear la agenda");
          }
        } catch (error) {
          console.error("Error creating agenda:", error);
        }
      },
      getAgenda: async (agendasslug) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendasslug}`
          );
          const detalleAgendaJson = await response.json();
          return detalleAgendaJson;
        } catch (error) {
          console.error("Error fetching agenda details:", error);
        }
      },
      postContacto: async (agendasslug, newContact) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendasslug}/contacts/${newContact}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newContact),
            }
          );
          if (response.ok) {
            const addedContact = await response.json();
            const store = getStore();
            setStore({
              contacts: [...store.contacts, addedContact],
            });
            console.log("Contacto añadido con éxito");
          } else {
            console.error("Error al crear contacto");
          }
        } catch (error) {
          console.error("Error agregando contacto:", error);
        }
      },

      deleteContact: async (id) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendasslug}/contacts/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            const store = getStore();
            const updatedContacts = store.contacts.filter(
              (contact) => contact.id !== id
            );
            setStore({ contacts: updatedContacts });
          } else {
            console.error("Failed to delete contact");
          }
        } catch (error) {
          console.error("Error deleting contact:", error);
        }
      },

      updateContact: async (id, updatedContact) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${agendasslug}/contacts/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedContact),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const store = getStore();
            const updatedContacts = store.contacts.map((contact) =>
              contact.id === id ? data : contact
            );
            setStore({ contacts: updatedContacts });
            return data;
          } else {
            console.error("Failed to update contact");
          }
        } catch (error) {
          console.error("Error updating contact:", error);
        }
      },
      // Otras acciones aquí según sea necesario
    },
  };
};

export default getState;

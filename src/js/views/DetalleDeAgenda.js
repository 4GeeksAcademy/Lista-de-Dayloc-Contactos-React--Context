import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import { Agregar } from "../component/Agregar";

const Detalle = () => {
  const { actions, store } = useContext(Context);
  const { agendasslug } = useParams();
  const [detalleAgenda, setDetalleAgenda] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [showEditFields, setShowEditFields] = useState(false);

  const fetchData = async () => {
    const resp = await actions.getAgenda(agendasslug);
    setDetalleAgenda(resp);
  };

  const [nameValue, setNameValue] = useState("");
  const [telefonoValue, setTelefonoValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const validateInputName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateInputTel = (tel) => /^[0-9]+$/.test(tel);

  const handleNameChange = (event) => {
    const value = event.target.value;
    if (validateInputName(value) || value === "") {
      setNameValue(value);
    }
  };

  const handleTelChange = (event) => {
    const value = event.target.value;
    if (validateInputTel(value) || value === "") {
      setTelefonoValue(value);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const agregarContacto = () => {
    const newContact = {
      name: nameValue,
      phone: telefonoValue,
      email: emailValue,
      address: addressValue,
    };
    detalleAgenda.contacts.push(newContact);
    actions.postContacto(newContact);

    setNameValue("");
    setTelefonoValue("");
    setEmailValue("");
    setAddressValue("");
  };

  const editarContacto = () => {
    const updatedContacts = detalleAgenda.contacts.map((contact) =>
      contact.id === editingContact.id
        ? {
            ...contact,
            name: nameValue,
            phone: telefonoValue,
            email: emailValue,
            address: addressValue,
          }
        : contact
    );

    actions.updateContact(editingContact.id, {
      name: nameValue,
      phone: telefonoValue,
      email: emailValue,
      address: addressValue,
    });

    setDetalleAgenda({ ...detalleAgenda, contacts: updatedContacts });
    setEditingContact(null);
    setShowEditFields(false);

    setNameValue("");
    setTelefonoValue("");
    setEmailValue("");
    setAddressValue("");
  };

  const eliminarContacto = async (id) => {
    await actions.deleteContact(id);
    setDetalleAgenda({
      ...detalleAgenda,
      contacts: detalleAgenda.contacts.filter((contact) => contact.id !== id),
    });
  };

  const startEditing = (contact) => {
    setEditingContact(contact);
    setNameValue(contact.name);
    setTelefonoValue(contact.phone);
    setEmailValue(contact.email);
    setAddressValue(contact.address);
    setShowEditFields(true);
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  if (!(detalleAgenda && detalleAgenda.contacts)) return null;

  return (
    <div className="container text-center">
      <h1>Contactos de {agendasslug}</h1>

      {showEditFields && (
        <div className="container mt-3">
          <h3 className="mt-3 mb-3 text-danger" >Editando contacto...</h3>
          <div className="row mb-3 justify-content-center">
            <div className="col-3">
              <input
                className="form-control"
                value={nameValue}
                onChange={handleNameChange}
                placeholder="Nombre de contacto"
              />
            </div>
            <div className="col-3">
              <input
                className="form-control"
                value={telefonoValue}
                onChange={handleTelChange}
                placeholder="Teléfono"
              />
            </div>
            <div className="col-3">
              <input
                className="form-control"
                value={emailValue}
                onChange={(event) => setEmailValue(event.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="col-3">
              <input
                className="form-control"
                value={addressValue}
                onChange={(event) => setAddressValue(event.target.value)}
                placeholder="Dirección"
              />
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={editingContact ? editarContacto : agregarContacto}
          >
            {editingContact ? "Actualizar" : "Aceptar"}
          </button>
        </div>
      )}

      <div className="container ntaa mt-4">
        <div className="row mb-3 justify-content-left bg-info">
          <div className="col-3">
            <h5>Nombre</h5>
          </div>
          <div className="col-2">
            <h5>Teléfono</h5>
          </div>
          <div className="col-3">
            <h5>Email</h5>
          </div>
          <div className="col-2">
            <h5>Address</h5>
          </div>
          <div className="col-2">
            <h5>Acciones</h5>
          </div>
        </div>
        {detalleAgenda.contacts.map((item) => (
          <div className="row mt-4 justify-content-left" key={item.id}>
            <div className="col-3">{item.name}</div>
            <div className="col-2">{item.phone}</div>
            <div className="col-3">{item.email}</div>
            <div className="col-2">{item.address}</div>
            <div className="col-2 d-flex justify-content-between">
              <button
                className="btn btn-warning me-1"
                onClick={() => startEditing(item)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger ms-1"
                onClick={() => eliminarContacto(item.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link className="btn btn-secondary mt-3 mb-5" to="/">
        Agendas
      </Link>
      <h1 className="mb-3">Agregar Contacto </h1>
      <Agregar />
    </div>
  );
};

export default Detalle;

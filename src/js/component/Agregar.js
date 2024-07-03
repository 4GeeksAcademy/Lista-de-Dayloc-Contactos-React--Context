import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/agrear.css";

export const Agregar = () => {
  const [nameValue, setNameValue] = useState("");
  const [telefonoValue, setTelefonoValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const { actions } = useContext(Context);
  const slug = "Dayloc";
  const validateInput = () => {
    if (!nameValue.trim()) {
      alert("Nombre de Contacto necesario");
      return false;
    }
    if (!telefonoValue.trim()) {
      alert("Teléfono necesario");
      return false;
    }
    if (!emailValue.trim()) {
      alert("Email necesario");
      return false;
    }
    if (!addressValue.trim()) {
      alert("Dirección necesaria");
      return false;
    }
    return true;
  };

  const saveContact = () => {
    const newContact = {
      name: nameValue,
      phone: telefonoValue,
      email: emailValue,
      address: addressValue,
      agenda_slug: slug,
    };

    actions.postContacto("Dayloc", newContact).then(() => {
      setNameValue("");
      setTelefonoValue("");
      setEmailValue("");
      setAddressValue("");
    });
  };

  const handleSave = () => {
    if (validateInput()) {
      saveContact();
    }
  };

  return (
    <div className="container text-center" id="contagregar">
      <div className="row" id="agr">
        <div className="col-3">
          <input
            className="Name"
            value={nameValue}
            onChange={(event) => setNameValue(event.target.value)}
            placeholder="Nombre de contacto"
          ></input>
        </div>
        <div className="col-3">
          <input
            className="telefono"
            value={telefonoValue}
            onChange={(event) => setTelefonoValue(event.target.value)}
            placeholder="Teléfono"
          ></input>
        </div>
        <div className="col-3">
          <input
            className="email"
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
            placeholder="Email"
          ></input>
        </div>
        <div className="col-3">
          <input
            className="direccion"
            value={addressValue}
            onChange={(event) => setAddressValue(event.target.value)}
            placeholder="Dirección"
          ></input>
        </div>
      </div>
      <button className="guardar" onClick={handleSave}>
        Guardar
      </button>
    </div>
  );
};

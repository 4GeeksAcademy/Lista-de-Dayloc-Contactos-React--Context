import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [agendas, setAgendas] = useState([]);
  if (!agendas) return null;

  const validateInput = () => {
    if (!inputValue.trim()) alert("La lista no puede estar vacia");

    actions.postAgenda(inputValue);

    setInputValue("");
    alert(
      "Se ha creado correctamente la agenda por favor actualizar la página"
    );
    window.location.reload();
  };

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const agendasData = await actions.getAgendas();
        console.log("Agendas:", agendasData); // Asegúrate que agendasData sea un array en la consola
        setAgendas(agendasData.agendas); // Asigna directamente el array de agendas
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agendas:", error);
        setLoading(false);
      }
    };

    fetchAgendas();
  }, []);

  return (
    <div className="container text-center">
      <h1 className="titulo mb-4">Listas de Contactos</h1>
      <div className="ul1 ">
        <div className="row mb-5">
          <div className="form  bg-dark col-8">
            <input
              className="agregar "
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && validateInput()}
              placeholder="Añadir nueva lista "
            ></input>
          </div>
          <div className="form col-4">
            <button className="addlist" onClick={() => validateInput()}>
              Guardar
            </button>
          </div>
        </div>
        {agendas.map((agendas) => (
          <Link to={`/Detalle/${agendas.slug}`}>
            <div className="row mt-1 " key={agendas.id} id="list">
              <div className="col-10 text-start">{agendas.slug}</div>

              <div className="col-2 text-end">{agendas.id} </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

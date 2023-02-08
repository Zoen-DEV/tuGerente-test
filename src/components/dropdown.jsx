import React, { useState } from "react";
import "../styles/Dropdown.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Dropdown = ({
  setDisplayForm,
  data,
  filter,
  setFilter,
  handleScroll,
}) => {
  // Este es un estado que cambia cuando se hace foco o se quita el foco del input, para mostrar u ocultar las opciones
  const [focus, setFocus] = useState(false);

  // Esta funcion se encarga de manejar el evento onChange de el filtro
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="dropdown">
      <div className="input_container">
        <input
          type="text"
          onChange={handleChange}
          value={filter}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 110);
          }}
          placeholder="Ingrese el nombre/nit/telefono del cliente"
          style={{
            paddingBottom: focus ? "10px" : "",
            borderRadius: !focus ? "3px" : "",
          }}
        />
      </div>
      <ul style={{ height: focus ? "300px" : "auto" }} onScroll={handleScroll}>
        {focus ? (
          <>
            <li
              className="add dropdown_options"
              onClick={() => {
                setDisplayForm(true);
                setFocus(false);
              }}
            >
              Agregar cliente <AiOutlinePlusCircle className="add_icon" />
            </li>
            {data.map(({ name }, index) => (
              <li key={index} className="dropdown_options">
                {name}
              </li>
            ))}
          </>
        ) : (
          <></>
        )}
      </ul>
      {/* <button
        onClick={() => setFocus(false)}
        className="close_dropdown"
        style={{ display: !focus ? "none" : "" }}
      >
        <BiUpArrow />
      </button> */}
    </div>
  );
};

export default Dropdown;

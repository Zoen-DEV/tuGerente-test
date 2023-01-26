import React, { useState } from "react";
import "../styles/Dropdown.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiUpArrow } from "react-icons/bi";

const Dropdown = ({ setDisplayForm, data, filter, setFilter, handleScroll }) => {
  const [focus, setFocus] = useState(false);

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
          placeholder="Ingrese el nombre del cliente para filtrar"
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
      <button
        onClick={() => setFocus(false)}
        className="close_dropdown"
        style={{ display: !focus ? "none" : "" }}
      >
        <BiUpArrow />
      </button>
    </div>
  );
};

export default Dropdown;

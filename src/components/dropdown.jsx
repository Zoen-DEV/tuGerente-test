import React, { useState } from "react";
import "../styles/Dropdown.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiUpArrow } from "react-icons/bi";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const pagination = (page, data) => {
  const start = (page - 1) * 20;
  const end = start + 20;
  return data.slice(start, end);
};

const Dropdown = ({ setDisplayForm, data, filter, setFilter }) => {
  const [focus, setFocus] = useState(false);
  const [page, setPage] = useState(1);

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
      <ul style={{ height: focus ? "300px" : "auto" }}>
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
            {data.length > 20 ? (
              <li className="pagination_controller">
                <button
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                >
                  <FaArrowAltCircleLeft />
                </button>
                <span>
                  {page} / {Math.ceil(data.length / 20)}
                </span>
                <button
                  onClick={() => {
                    if (page < Math.ceil(data.length / 20)) {
                      setPage(page + 1);
                    }
                  }}
                >
                  <FaArrowAltCircleRight />
                </button>
              </li>
            ) : (
              <></>
            )}
            {pagination(page, data).map(({ name }, index) => (
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

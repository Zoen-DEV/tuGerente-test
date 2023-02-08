import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";

const Form = ({ displayForm, setDisplayForm, getClients, filter, filterType }) => {

  // Initial state del formulario
  const initialState = {
    name: "",
    razonSocial: "",
    nit: "",
    telefono: "",
    codigo: "",
  };
  // Estado del formulario
  const [data, setData] = useState(initialState);

  // Este useEffect hace que se agrege el filtro al respectivo input que le corresponda (name / nit / telefono) se ejecuta cuando se renderiza el componente y cuando cambia el filtro.
  useEffect(() => {
    setData({
      ...initialState,
      [filterType(filter)]: filter
    });
  }, [filter]);

  // Esta funcion se encarga de manejar los cambios de los inputs
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Esta es la funcion que se encarga del submit pero antes valida los datos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.name.length === 0 ||
      data.razonSocial.length === 0 ||
      data.nit.length === 0 ||
      data.telefono.length === 0 ||
      data.codigo.length === 0
    ) {
      Swal.fire("Ningun campo puede estar vacio");
    } else if (data.name.length > 40) {
      Swal.fire("El nombre no puede contener mas de 40 caracteres");
    } else if (data.name.length < 8) {
      Swal.fire("El nombre no puede contener menos de 8 caracteres");
    } else if (data.razonSocial > 30) {
      Swal.fire("La razon social no puede contener mas de 30 caracteres");
    } else if (data.razonSocial < 5) {
      Swal.fire("La razon social no puede contener menos de 5 caracteres");
    } else if (data.nit.length !== 13 || !/^[0-9]+$/.test(data.nit)) {
      Swal.fire(
        "El nit debe cumplir con el formato legal (solo numeros y 13 digitos)"
      );
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        data.telefono
      )
    ) {
      Swal.fire("El telefono debe ser un numero de telefono valido");
    } else {
      // Si todos los datos son correctos se hace un post al firestore, se reinicia el formulario, se vuelve a traer los primero 20 clientes y se cierra el popup del formulario
      try {
        addDoc(collection(db, "client"), data);
        setData(initialState);
        getClients();
        setDisplayForm(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <article
      className="form_container"
      style={{ display: !displayForm ? "none" : "" }}
    >
      <section className="form_section">
        <button onClick={() => setDisplayForm(false)}>
          <AiOutlineCloseCircle />
        </button>
        <h3>Agregar nuevo cliente</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Ingrese el nombre del cliente"
          />
          <input
            type="text"
            name="razonSocial"
            value={data.razonSocial}
            onChange={handleChange}
            placeholder="Ingrese la razón social"
          />
          <input
            type="text"
            name="nit"
            value={data.nit}
            onChange={handleChange}
            placeholder="Ingrese el nit del cliente"
          />
          <input
            type="text"
            name="telefono"
            value={data.telefono}
            onChange={handleChange}
            placeholder="Ingrese el telefono del cliente"
          />
          <input
            type="text"
            name="codigo"
            value={data.codigo}
            onChange={handleChange}
            placeholder="Ingrese el codigo"
          />
          <input type="submit" className="submit_btn" />
        </form>
      </section>
    </article>
  );
};

export default Form;

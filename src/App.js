import { useState, useEffect } from "react";
import Dropdown from "./components/dropdown";
import Form from "./components/form";
import "./styles/App.css";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  where,
  query,
  limit,
  startAfter,
} from "firebase/firestore";

// Esta funcion es para definir el tipo de filtro que se va a hacer
const filterType = (filter) => {
  return /^[0-9]+$/.test(filter[0])
    ? "nit"
    : filter[0] === "+"
    ? "telefono"
    : "name";
};

// En el caso de que el filtro sea por nombre pasa la primer letra del string a Mayuscula y el resto a minuscula
const toUpperCaseFirstLetter = (filter, filterType) => {
  if (filterType === "name") {
    const firstLetter = filter.charAt(0).toUpperCase();
    const string = filter.slice(1).toLowerCase();
    return `${firstLetter}${string}`;
  }
  return filter;
};

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [lastItem, setLastItem] = useState();

  // Esta funcion hace la primer llamada a la base de datos de firebase y devuelve la primer pagina de 20 items
  const getClients = async () => {
    const clientRef = collection(db, "client");
    const queryRef =
      filter.length > 0
        ? query(
            clientRef,
            where(
              filterType(filter),
              ">=",
              toUpperCaseFirstLetter(filter, filterType(filter))
            ),
            where(
              filterType(filter),
              "<",
              toUpperCaseFirstLetter(filter, filterType(filter)) + "\uf8ff"
            ),
            limit(20)
          )
        : query(clientRef, limit(20));
    const result = await getDocs(queryRef);
    setLastItem(result.docs[result.docs.length - 1]);
    setData(
      result.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  // Esta funcion hace la peticion a la base de datos de firebase desde la pagina 2 en adelante
  const getMorePages = async () => {
    const clientRef = collection(db, "client");
    const queryRef =
      filter.length > 0
        ? query(
            clientRef,
            startAfter(lastItem),
            where(
              filterType(filter),
              ">=",
              toUpperCaseFirstLetter(filter, filterType(filter))
            ),
            where(
              filterType(filter),
              "<",
              toUpperCaseFirstLetter(filter, filterType(filter)) + "\uf8ff"
            ),
            limit(20)
          )
        : query(clientRef, startAfter(lastItem), limit(20));
    const result = await getDocs(queryRef);
    setData([
      ...data,
      ...result.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    ]);
    if (result.docs[result.docs.length - 1]) {
      setLastItem(result.docs[result.docs.length - 1]);
    }
  };

  // Esta funcion llama la funcion 'getMorePages' cuando el scroll baja hasta el ultimo elemento
  const handleScroll = (e) => {
    const container = e.target;
    if (
      container.scrollTop + container.offsetHeight >=
      container.scrollHeight
    ) {
      getMorePages();
    }
  };

  // Este es un useEffect que se ejecuta cada vez que el filtro cambia
  useEffect(() => {
    getClients();
  }, [filter]);

  return (
    <div className="App">
      <h2>tu Gerente prueba tecnica</h2>
      <div className="dropdown_content">
        <Dropdown
          setDisplayForm={setDisplayForm}
          getClients={getClients}
          data={data}
          filter={filter}
          setFilter={setFilter}
          handleScroll={handleScroll}
        />
        <Form
          displayForm={displayForm}
          setDisplayForm={setDisplayForm}
          getClients={getClients}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}

export default App;

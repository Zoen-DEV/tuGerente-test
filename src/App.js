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

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [lastItem, setLastItem] = useState();

  const getClients = async () => {
    const clientRef = collection(db, "client");
    const queryRef =
      filter.length > 0
        ? query(
            clientRef,
            where("name", ">=", filter),
            where("name", "<", filter + "\uf8ff"),
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

  const getMorePages = async () => {
    const clientRef = collection(db, "client");
    const queryRef =
      filter.length > 0
        ? query(
            clientRef,
            startAfter(lastItem),
            where("name", ">=", filter),
            where("name", "<", filter + "\uf8ff"),
            limit(20)
          )
        : query(clientRef, startAfter(lastItem), limit(20));
    const result = await getDocs(queryRef);
    setData([
      ...data,
      ...result.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    ]);
    setLastItem(result.docs[result.docs.length - 1]);
  };

  const handleScroll = (e) => {
    const container = e.target;
    if (
      container.scrollTop + container.offsetHeight >=
      container.scrollHeight
    ) {
      getMorePages();
    }
  };

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

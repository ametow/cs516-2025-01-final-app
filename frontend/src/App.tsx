import React, { useEffect, useState } from "react";
import "./App.css";
import AddContact from "./components/AddContact";
import { IContact } from "./components/IContact";
import ContactList from "./components/ContactList";
import { GET_CONTACTS_URL } from "./components/API";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const reload = async () => {
    try {
      const response = await axios.get(GET_CONTACTS_URL);
      setContacts(response.data);
    } catch (error) {
    }
  };
  useEffect(() => {
    reload();
  }, [])
  return (
    <div>
      <AddContact reload={reload} contacts={contacts} />
      <hr />
      <ContactList contacts={contacts} />
    </div>
  );
}

export default App;

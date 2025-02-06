import React from "react";
import { IContact } from "./IContact";
import Contact from "./Contact"; // Import the Contact component

type ContactListProps = {
  contacts: IContact[];
};

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Contact List</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center">No contacts available.</p>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <Contact key={contact.email} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;

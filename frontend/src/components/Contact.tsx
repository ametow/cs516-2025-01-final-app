import React from "react";
import { IContact } from "./IContact";

type ContactProps = {
  contact: IContact;
};

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <div className="w-[300px] h-[120px] flex items-center border border-gray-500 rounded-lg shadow-md p-4 bg-white">
      <img
        src={contact.imageUrl!}
        alt={contact.name}
        className="w-16 h-16 rounded-full border border-gray-400 object-cover"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
        <p className="text-gray-600 text-sm">{contact.email}</p>
      </div>
    </div>
  );
};

export default Contact;

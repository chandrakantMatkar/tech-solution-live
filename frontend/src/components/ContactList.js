
import React, { useState, useEffect, useRef } from 'react';
import { FaEdit,FaSave } from "react-icons/fa"

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const textareaRefs = useRef({});

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contacts/all-contacts',{
            headers: {
                'x-auth-token': localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA1NDEwMjg0fQ.-Egn-IoLFCa-gS1a8DMfl6aKrgYTjJC2CdwsoRQ6MtE',
                "Content-Type": "application/json"
            },
            method: 'GET'
        });
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = Array.isArray(contacts) && contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (contactId) => {
    console.log(`Editing contact with ID: ${contactId}`);
    textareaRefs.current[contactId].disabled = false;
  };
  const handleSave = (contactId) => {
    // Implement the logic to handle editing the contact based on contactId
    console.log(`Saving contact with ID: ${contactId}`);
    textareaRefs.current[contactId].disabled = true;
  };

  return (
    <div className="contact-list-container">
      <h1 className='font-bold lg:text-2xl'>Contact List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Call Time</th>
            <th>Message</th>
            <th>Remark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts && filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.convenientTime}</td>
              <td>{contact.message}</td>
              <td><textarea value={contact.remark} disabled ref={(textarea) => (textareaRefs.current[contact.id] = textarea)} /></td>
              <td>
              <FaEdit style={{margin: "3px"}} onClick={()=>handleEdit(contact.id)}/>
              <FaSave style={{margin: "3px"}} onClick={()=>handleSave(contact.id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;

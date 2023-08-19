import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Modal, Box, Typography } from '@mui/material';
import ContactModal from './ContactModal';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;
}

const ContactPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setModalOpen(true);
  };

  const handleDeleteContact = (contact: Contact) => {
    const updatedContacts = contacts.filter(c => c.id !== contact.id);
    setContacts(updatedContacts);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveContact = (contact: Contact) => {
    if (editingContact) {
      const updatedContacts = contacts.map(c => (c.id === editingContact.id ? contact : c));
      setContacts(updatedContacts);
    } else {
      setContacts([...contacts, contact]);
    }
    handleCloseModal();
    setEditingContact(null); 
  };

  const handleViewContact = (contact: Contact) => {
    setViewingContact(contact);
  };

  const closeViewContactModal = () => {
    setViewingContact(null);
  };

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 4,
    }}
  >
    <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mb: 2 }}>
      Add Contact
    </Button>
    <ContactModal
      open={modalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveContact}
      contactToEdit={editingContact}
    />
    <List>
      {contacts.map(contact => (
        <ListItem key={contact.id} sx={{m:1}}>
          <ListItemText
            primary={`${contact.firstName} ${contact.lastName}`}
            secondary={`Active: ${contact.active ? 'Yes' : 'No'}`}
          />
          <Button variant="contained" color="primary" onClick={() => handleEditContact(contact)} sx={{ mr: 2 }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDeleteContact(contact)} sx={{ mr: 2 }}>
            Delete
          </Button>
          <Button variant="contained" color="info" onClick={() => handleViewContact(contact)}>
            View Details
          </Button>
        </ListItem>
      ))}
    </List>
    {viewingContact && (
      <Modal open={Boolean(viewingContact)} onClose={closeViewContactModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Contact Details</Typography>
          <Typography>First Name: {viewingContact.firstName}</Typography>
          <Typography>Last Name: {viewingContact.lastName}</Typography>
          <Typography>Active: {viewingContact.active ? 'Yes' : 'No'}</Typography>
          <Button variant="contained" color="primary" onClick={closeViewContactModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    )}
  </Box>
  );
};

export default ContactPage;

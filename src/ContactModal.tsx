import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;
}

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (contact: Contact) => void;
  contactToEdit: Contact | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [active, setActive] = useState(false);

  const handleSave = () => {
    const newContact: Contact = {
      id: Date.now(),
      firstName,
      lastName,
      active,
    };

    onSave(newContact);
    onClose(); 
    // Close the modal after saving
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          m:2 
        }}
      >
        <Box
          sx={{
            width: '90%', 
            maxWidth: 400, 
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Add Contact</Typography>
          <TextField label="First Name" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ mt: 2 }}/>
          <TextField label="Last Name" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ mt: 2 }} />
          <FormControlLabel control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} />} label="Active" />
          <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2,mr:1}}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>Save</Button> 
        </Box>
      </Box>
    </Modal>
  );
}

export default ContactModal;

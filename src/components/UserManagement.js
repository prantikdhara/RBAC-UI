import React, { useState } from "react";
import { Button } from "@mui/material";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import axios from "axios";

const UserManagement = () => {
  const [openForm, setOpenForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenForm = (user) => {
    setCurrentUser(user);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setCurrentUser(null);
    setOpenForm(false);
  };

  const handleSaveUser = async (user) => {
    if (user.id) {
      await axios.put(`http://localhost:3001/users/${user.id}`, user);
    } else {
      await axios.post("http://localhost:3001/users", user);
    }
    handleCloseForm();
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpenForm(null)}>
        Add User
      </Button>
      <UserTable onEdit={handleOpenForm} onDelete={handleDeleteUser} />
      <UserForm
        open={openForm}
        handleClose={handleCloseForm}
        handleSave={handleSaveUser}
        user={currentUser}
      />
    </div>
  );
};

export default UserManagement;
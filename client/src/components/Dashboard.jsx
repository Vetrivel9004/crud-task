// client/src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  // Fetch users from the server
  useEffect(() => {
    axios.get('http://localhost:5000/api/users', { withCredentials: true })
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Handle form submission for creating a new user
  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users', newUser, { withCredentials: true })
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '' });
      })
      .catch(error => console.error('Error creating user:', error));
  };

  // Handle user deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`, { withCredentials: true })
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  // Handle user update (editing)
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/users/${editUser._id}`, editUser, { withCredentials: true })
      .then(response => {
        setUsers(users.map(user => (user._id === editUser._id ? response.data : user)));
        setEditUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Create User Form */}
      <h3>Create User</h3>
      <form onSubmit={handleCreate}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>

      {/* Edit User Form */}
      {editUser && (
        <div>
          <h3>Edit User</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update User</button>
          </form>
        </div>
      )}

      {/* Display Users */}
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => setEditUser(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

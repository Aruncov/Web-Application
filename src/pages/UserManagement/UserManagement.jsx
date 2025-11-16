// src/pages/UserManagement/UserManagement.jsx
import React, { useState, useEffect } from "react";
import { getUsers, addUser, deleteUser } from "../../utils/auth";
import "./UserManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [empId, setEmpId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleAddUser = () => {
    try {
      if (!empId || !username || !password) {
        setError("All fields are required!");
        return;
      }
      addUser(empId, username, password);
      setUsers(getUsers());
      setEmpId("");
      setUsername("");
      setPassword("");
      setError("");
      alert("✅ User added successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = (username) => {
    if (window.confirm(`Delete user "${username}"?`)) {
      deleteUser(username);
      setUsers(getUsers());
    }
  };

  return (
    <div className="user-management">
      <h2>👥 User Management</h2>

      <div className="add-user-form">
        <input
          type="text"
          placeholder="Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <input
          type="text"
          placeholder="User ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>➕ Add User</button>
      </div>

      {error && <p className="error">{error}</p>}

      <table className="user-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>User ID</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.username}>
              <td>{u.empId}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== "SuperAdmin" && (
                  <button onClick={() => handleDeleteUser(u.username)}>🗑️ Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;

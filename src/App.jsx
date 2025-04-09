import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');
  const [newName, setNewUser] = useState('');
  const [newAge, setNewAge] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (!newName || !newAge) return alert('Please enter name and age');

    try {
      await addDoc(usersCollectionRef, {
        name: newName,
        age: Number(newAge),
      });
      setNewUser('');
      setNewAge('');
      fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (!editId || !newName || !newAge) return;

    try {
      const userDoc = doc(db, 'users', editId);
      await updateDoc(userDoc, {
        name: newName,
        age: Number(newAge),
      });
      setEditId(null);
      setNewUser('');
      setNewAge('');
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setNewUser(user.name);
    setNewAge(user.age);
  };

  return (
    <>
      <div className="add-user">
        <h1 style={{ textAlign: 'center' }}>
          {editId ? 'Update User' : 'Add User'}
        </h1>
        <form onSubmit={editId ? updateUser : addUser}>
          <input
            type="text"
            value={newName}
            placeholder="Name"
            onChange={(e) => setNewUser(e.target.value)}
          />
          <input
            type="number"
            value={newAge}
            placeholder="Age"
            onChange={(e) => setNewAge(e.target.value)}
          />
          <button type="submit">
            {editId ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>

      <div className="app-container">
        <h1>Users</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => startEdit(user)}
                    >
                     <span style={{fontSize:"14px"}}>✏️Edit</span>

                    </button>{' '}
                    <button
                      className="delete-button"
                      onClick={() => deleteUser(user.id)}
                    >
                      
                      <span style={{fontSize:"14px"}}>❌Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;

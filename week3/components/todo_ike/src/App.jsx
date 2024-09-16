import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAddUser = () => {
    if (editMode) {
      setUsers(
        users.map((user) =>
          user.id === editId ? { ...user, name, status } : user
        )
      );
      setEditMode(false);
      setEditId(null);
    } else {
      setUsers([...users, { id: uuidv4(), name, status }]);
    }
    setName("");
    setStatus("ACTIVE");
  };

  const filterUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (id) => {
    const editingUser = users.find((user) => user.id === id);
    setName(editingUser.name);
    setStatus(editingUser.status);
    setEditMode(true);
    setEditId(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      {/*form*/}
      <div className="mb-4 flex gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter name"
          className="border px-2 py-1 rounded w-full"
        />
        <div className="flex items-center justify-around w-1/4">
          <label>Status: </label>
          <label>
            <input
              value="ACTIVE"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "ACTIVE"}
              type="radio"
            />{" "}
            Yes
          </label>
          <label>
            <input
              value="INACTIVE"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === "INACTIVE"}
              type="radio"
            />{" "}
            No
          </label>
        </div>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded w-1/3"
        >
          {editMode ? "Update User" : "Add User"}
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ..."
          className="border px-2 py-1 rounded w-1/2"
        />
      </div>

      {/*User list */}
      <table className="table-auto w-full border-collapse border ">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

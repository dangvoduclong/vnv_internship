import { useState } from "react";
import { useUpdateUser } from "../../hooks/useUserDetail";

const PutPages = () => {
  const [userId, setUserId] = useState("");
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "" });
  const { userDetail, error, loading, updateUser } = useUpdateUser(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser(userId, updatedUser);
    setUserId("");
    setUpdatedUser({ name: "", email: "" });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={updatedUser.name}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, name: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={updatedUser.email}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, email: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600">Error: {error.message}</div>}
      <h2 className="text-xl font-semibold mt-6">All Users After Update:</h2>
      <pre className="bg-gray-100 p-2 rounded border">
        {JSON.stringify(userDetail, null, 2)}
      </pre>
    </div>
  );
};

export default PutPages;

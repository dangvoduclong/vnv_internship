import { useState } from "react";
import { useDeleteUser } from "../../hooks/useUserDetail";

const DeletePages = () => {
  const [userId, setUserId] = useState("");
  const { userDetail, error, loading, deleteUser } = useDeleteUser(false);

  const handleDelete = async () => {
    await deleteUser(userId);
    setUserId("");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Delete User</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-500"
        }`}
      >
        {loading ? "Deleting..." : "Delete User"}
      </button>

      {error && <div className="mt-4 text-red-600">Error: {error.message}</div>}
      <h2 className="text-xl font-semibold mt-6">All Users After Deletion:</h2>
      <pre className="bg-gray-100 p-2 rounded border">
        {JSON.stringify(userDetail, null, 2)}
      </pre>
    </div>
  );
};

export default DeletePages;

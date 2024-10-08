import { useState } from "react";
import { useCreateUser } from "../../hooks/useUserDetail";

const PostPages = () => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const { userDetail, error, loading, createUser } = useCreateUser(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(newUser);
    setNewUser({ name: "", email: "" });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600">Error: {error.message}</div>}
      <h2 className="text-xl font-semibold mt-6">All Users After Creation:</h2>
      <pre className="bg-gray-100 p-2 rounded border">
        {JSON.stringify(userDetail, null, 2)}
      </pre>
    </div>
  );
};

export default PostPages;

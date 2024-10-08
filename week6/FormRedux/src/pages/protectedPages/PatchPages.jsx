import { useState } from "react";
import { usePatchUser } from "../../hooks/useUserDetail";

const PatchPages = () => {
  const [userId, setUserId] = useState("");
  const [patchedUser, setPatchedUser] = useState({ name: "" });
  const { userDetail, error, loading, patchUser } = usePatchUser(false);

  const handlePatch = async (e) => {
    e.preventDefault();
    await patchUser(userId, patchedUser);
    setUserId("");
    setPatchedUser({ name: "" });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Patch User</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <form onSubmit={handlePatch} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={patchedUser.name}
          onChange={(e) =>
            setPatchedUser({ ...patchedUser, name: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {loading ? "Patching..." : "Patch User"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600">Error: {error.message}</div>}
      <h2 className="text-xl font-semibold mt-6">All Users After Patch:</h2>
      <pre className="bg-gray-100 p-2 rounded border">
        {JSON.stringify(userDetail, null, 2)}
      </pre>
    </div>
  );
};

export default PatchPages;

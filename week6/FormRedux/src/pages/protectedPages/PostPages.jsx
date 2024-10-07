import { useState } from "react";
import { useCreateUser } from "../../hooks/useUserDetail";

const PostPages = () => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const { userDetail, loading, error, createUser } = useCreateUser(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      name: name,
      mail: body,
    };

    createUser(newPost);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Create New Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      <hr className="my-8" />

      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        User Details
      </h1>

      {userDetail && userDetail.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            All Users
          </h2>
          <ul className="space-y-4">
            {userDetail.map((user, id) => (
              <li key={id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <pre className="text-sm text-gray-600">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostPages;

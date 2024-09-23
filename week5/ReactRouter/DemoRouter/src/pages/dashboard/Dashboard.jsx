import { useNavigate } from "react-router-dom";
import { userData } from "../../assets/data";
const Dashboard = () => {
  const navigate = useNavigate();

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <ul className="space-y-4">
        {userData.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => handleUserClick(user.id)}
              className="flex items-center justify-between w-full p-4 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <span className="font-semibold">{user.name}</span>
              <span className="text-gray-500">→</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

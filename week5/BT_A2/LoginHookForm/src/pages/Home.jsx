import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Home;

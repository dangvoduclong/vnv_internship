import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Home</h1>
      {location.state && <p>{location.state.customMessage}</p>}
    </div>
  );
};

export default Home;

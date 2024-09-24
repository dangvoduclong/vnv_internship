import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  return (
    <div>
      <h1>About</h1>
      {location.state && <p>{location.state.customMessage}</p>}
    </div>
  );
};

export default About;

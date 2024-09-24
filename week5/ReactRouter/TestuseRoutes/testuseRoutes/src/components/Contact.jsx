import { useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Contact</h1>
      {location.state && <p>{location.state.customMessage}</p>}
    </div>
  );
};

export default Contact;

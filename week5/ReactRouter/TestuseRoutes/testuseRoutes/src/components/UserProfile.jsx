import { useLocation, useParams } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const { userId } = useParams();
  return (
    <div>
      UserProfile ID: {userId}
      {location.state && <p>{location.state.customMessage}</p>}
    </div>
  );
};

export default UserProfile;

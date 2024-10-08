import { useEffect, useState } from "react";

const ProfileUserApiPages = () => {
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await fetch("/auth/login", "GET", null, token);
        setUserInfo(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error.message);
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <div>
      {userInfo ? (
        <div>
          <h1>Profile</h1>
          <div>{userInfo}</div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          {/* Thêm thông tin khác nếu cần */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileUserApiPages;

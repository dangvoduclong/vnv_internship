import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(status);
  }, []);

  const login = (email, password) => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData[email]) {
      if (storedUserData[email].passWord === password) {
        setIsAuthenticated(true);
        localStorage.setItem("isLoggedIn", "true");
        console.log("User logged in.");

        return { success: true };
      } else {
        return { success: false, message: "Incorrect password" };
      }
    } else {
      return { success: false, message: "User not found" };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isLoggedIn");
    console.log("User logged out.");
  };
  return { isAuthenticated, login, logout };
};

export default useAuth;

import axiosInstance from "../utils/axiosConfig";

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  localStorage.setItem("accessToken", response.data.tokens.accessToken);
  return response.data;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return token !== null;
};

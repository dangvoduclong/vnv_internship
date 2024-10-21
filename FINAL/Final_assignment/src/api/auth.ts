import axiosInstance from "../utils/axiosConfig";

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post("/admins/auth/login", {
    username,
    password,
  });
  localStorage.setItem("accessToken", response.data.data.tokens.accessToken);
  return response.data;
};

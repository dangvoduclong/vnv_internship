import axios from "axios";

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const apiFetch = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await api({
      url: endpoint,
      method,
      data: body,
    });
    console.log("API Response: ", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error occurred");
    } else {
      throw new Error("Network error");
    }
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post("/auth/refresh", {
      refreshToken,
      expiresInMins: 10,
    });
    console.log("Refresh token response: ", response.data);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to refresh token");
    } else {
      throw new Error("Network error");
    }
  }
};

export default api;

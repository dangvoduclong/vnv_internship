import axios from "axios";

const API_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor cho các yêu cầu
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho các phản hồi
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const { data } = await refreshAccessToken(refreshToken);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        console.log("Refreshed access token: ", data.accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Hàm gọi API
export const apiFetch = async (endpoint, method = "GET", body = null) => {
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

// Hàm làm mới token
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post("/auth/refresh", {
      refreshToken,
      expiresInMins: 5,
    });
    console.log("Refresh token response: ", response.data);
    return response.data; // Trả về data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to refresh token");
    } else {
      throw new Error("Network error");
    }
  }
};
export default api;

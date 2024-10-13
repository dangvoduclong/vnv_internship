import axios from "axios";
import axiosWrapper from "./testConfig";

const updateRequestHeaders = (request, accessToken) => {
  request.headers["Authorization"] = `Bearer ${accessToken}`;
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return null;
  }
  try {
    const response = await axiosWrapper(axios).post("/auth/refresh", {
      refreshToken,
      expiresInMins: 1,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token", error);
    return null;
  }
};

export { updateRequestHeaders, refreshToken };

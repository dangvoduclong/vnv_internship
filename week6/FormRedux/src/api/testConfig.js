import axios from "axios";
import { refreshToken, updateRequestHeaders } from "./auth";
import axiosRetry from "axios-retry";

const axiosWrapper = (instance) => {
  axiosRetry(instance, {
    retries: 3,
    OnRetry: (retryCount, error) => {
      console.log(`Retry attempt ${retryCount}: ${error.message}`);
    },
    retryDelay: (retryCount) => retryCount * 500,
    retryCondition: (error) => {
      return axiosRetry.isNetworkOrIdempotentRequestError(error);
      //return error.response?.status >= 500 || error.code === 'ECONNABORTED';
    },
  });

  instance.interceptors.request.use(
    (config) => {
      if ("axios-retry" in config) {
        if (config["axios-retry"].retryCount > 0) {
          const retryAttempt = config["axios-retry"].retryCount ?? 1;
          const newTimeout = retryAttempt * 500;
          config.timeout = newTimeout;
          console.log("update configuration: ", newTimeout, retryAttempt);
          return config;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("error: ", error);
      const originalRequest = error.config;
      if ([401].includes(error.response.status) && !originalRequest._retry) {
        try {
          const newAccessToken = await refreshToken();
          updateRequestHeaders(originalRequest, newAccessToken);
          originalRequest._retry = true;
          return axios(originalRequest);
        } catch (error) {
          console.log("error: ", error);
        }
      } else {
        originalRequest._retry = true;
        return Promise.reject(error);
      }
    }
  );
  return instance;
};

export default axiosWrapper;

let axiosInstance;

export async function getAxiosInstance() {
  if (!axiosInstance) {
    let token = localStorage.getItem("accessToken");
    axiosInstance = axios.create({
      baseURL: "https://dummyjson.com",
      timeout: 1000,
    });

    if (token) {
      axiosInstance.defaults.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  } else {
    let token = localStorage.getItem("accessToken");
    if (token) {
      axiosInstance.defaults.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return axiosWrapper(axiosInstance);
}

import axiosInstance from "../axios/axiosConfig";

export const listUser = async (limit) => {
  try {
    const response = await axiosInstance.get(`/users?_limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

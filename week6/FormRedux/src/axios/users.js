import axiosInstance from "../axios/axiosConfig";

export const getUserDetail = async (userId) => {
  const response = await axiosInstance.get(`/users?_limit=${userId}`);
  return response.data;
};

export const createUser = async (user) => {
  try {
    const postResponse = await axiosInstance.post("/users", user);
    console.log("Post response:", postResponse.data);
    const getAllResponse = await axiosInstance.get("/users");
    return getAllResponse.data || postResponse.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userId, user) => {
  const response = await axiosInstance.put(`/users/${userId}`, user);
  return response.data;
};

export const patchUser = async (userId, user) => {
  const response = await axiosInstance.patch(`/users/${userId}`, user);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/users/${userId}`);
  return response.data;
};

import axiosInstance from "./axiosConfig";

export const getUserDetail = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (user) => {
  try {
    const postResponse = await axiosInstance.post("/users", user);
    console.log("Post response:", postResponse.data);
    return postResponse.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const EditUser = async (user) => {
  try {
    const response = await axiosInstance.put(`/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeUser = async (user) => {
  try {
    const response = await axiosInstance.delete(`/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

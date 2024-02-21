import axios from "axios";

const API = axios.create({baseURL: "http://localhost:7000"});

API.interceptors.request.use(req => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});

// Posts
export const fetchPosts = () => API.get("/posts");
export const createPost = newPost => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = id => API.delete(`/posts/${id}`);

// Users
export const login = formData => API.post("/users/login", formData);
export const fetchUsers = () => API.get("/users");
export const createUser = newUser => API.post("/users", newUser);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const updateUserRoles = (username, role) => API.patch(`/users/pushRole/${username}`, role);
export const deleteUserRoles = (username, role) => API.patch(`/users/deleteRole/${username}`, role);
export const deleteUser = id => API.delete(`/users/${id}`);

// Societies
export const fetchSocieties = () => API.get("/societies");
export const createSociety = newSociety => API.post("/societies", newSociety);
export const updateSociety = (id, updatedSociety) => API.patch(`/societies/${id}`, updatedSociety);
export const deleteSociety = id => API.delete(`/societies/${id}`);

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export const endpoints = {
  REQUEST_FORGOT_PASS: `/users/request-forgot-password`,
  VERIFY_OTP: `/users/verify-otp`,
  UPDATE_PASSWORD: `/users/update-password`
};

export const requestForgotPassword = async data => {
  try {
    const result = await axiosInstance.post(`${endpoints.REQUEST_FORGOT_PASS}`, data);
    return result;
  } catch (error) {
    return error.response;
  }
};
export const verifyOTP = async data => {
  try {
    const result = await axiosInstance.post(`${endpoints.VERIFY_OTP}`, data);
    return result;
  } catch (error) {
    return error.response;
  }
};
export const UpdateUserPassword = async data => {
  try {
    const result = await axiosInstance.post(`${endpoints.UPDATE_PASSWORD}`, data);
    return result;
  } catch (error) {
    return error.response;
  }
};

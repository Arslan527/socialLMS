import express from "express";

import {login, getUsers, createUser, updateUser, updateUserRoles, deleteUser, deleteUserRoles, requestForgotPassword, verifyOTP, createNewPassword} from "../controllers/users.js";

const router = express.Router();

router.post("/login", login);
router.get("/", getUsers);
router.post("/", createUser);
router.post("/request-forgot-password", requestForgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/update-password", createNewPassword);
router.patch("/:id", updateUser);
router.patch("/pushRole/:username", updateUserRoles);
router.delete("/:id", deleteUser);
router.patch("/deleteRole/:username", deleteUserRoles);

export default router;

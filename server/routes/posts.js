import express from "express";

import {getPosts, createPost, updatePost, deletePost, getOnePost, departmentBasedPost, openAPIChatBot} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/chatbot", openAPIChatBot);
router.get("/:department", departmentBasedPost);
router.get("/singlepost/:id", getOnePost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;

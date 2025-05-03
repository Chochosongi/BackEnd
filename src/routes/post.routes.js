import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createComment,
  createPost,
  deletePost,
  getComments,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

router.post("/:id/comment", authenticate, createComment);
router.get("/:id/comments", getComments);

export default router;

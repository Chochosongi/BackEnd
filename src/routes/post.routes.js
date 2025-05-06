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

/**
 * @swagger
 * tags:
 *   name: Community
 *   description: 게시글 및 댓글 API
 */

/**
 * @swagger
 * /community/posts:
 *   get:
 *     summary: 전체 게시글 조회
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: 게시글 목록 반환
 */
router.get("/", getPosts);

/**
 * @swagger
 * /community/posts/{id}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags: [Community]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 상세 반환
 *       404:
 *         description: 게시글 없음
 */
router.get("/:id", getPostById);

/**
 * @swagger
 * /community/posts:
 *   post:
 *     summary: 게시글 작성
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "운동 식단 질문 있어요"
 *               content:
 *                 type: string
 *                 example: "닭가슴살만 먹으면 되나요?"
 *     responses:
 *       201:
 *         description: 작성 성공
 */
router.post("/", authenticate, createPost);

/**
 * @swagger
 * /community/posts/{id}:
 *   put:
 *     summary: 게시글 수정
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정 성공
 *       403:
 *         description: 권한 없음
 */
router.put("/:id", authenticate, updatePost);

/**
 * @swagger
 * /community/posts/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       403:
 *         description: 권한 없음
 */
router.delete("/:id", authenticate, deletePost);

/**
 * @swagger
 * /community/posts/{id}/comment:
 *   post:
 *     summary: 댓글 작성
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "좋은 정보 감사합니다!"
 *     responses:
 *       201:
 *         description: 댓글 등록 성공
 */
router.post("/:id/comment", authenticate, createComment);

/**
 * @swagger
 * /community/posts/{id}/comments:
 *   get:
 *     summary: 댓글 목록 조회
 *     tags: [Community]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 댓글 목록 반환
 */
router.get("/:id/comments", getComments);

export default router;

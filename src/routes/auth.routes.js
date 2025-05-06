import { Router } from "express";
const router = Router();
import { signUp, login } from "../controllers/auth.controller.js";

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: 이메일 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               name:
 *                 type: string
 *                 example: 홍길동
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       409:
 *         description: 이미 가입된 이메일
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 이메일 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 비밀번호 틀림
 *       404:
 *         description: 유저 없음
 */
router.post("/login", login);

export default router;

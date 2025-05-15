import { Router } from "express";
const router = Router();
import { signUp, login, logout } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

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

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: 로그아웃
 *     description: 현재 사용자의 JWT 액세스 토큰을 블랙리스트에 등록하여 로그아웃 처리합니다.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 로그아웃 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그아웃 완료
 *       400:
 *         description: 잘못된 요청 또는 이미 블랙리스트에 등록된 토큰
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token already blacklisted
 *       401:
 *         description: 인증 실패 (토큰이 없거나 유효하지 않음)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그아웃 실패
 */
router.post("/logout", authenticate, logout);

export default router;

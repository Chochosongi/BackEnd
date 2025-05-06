import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createHealthInfo,
  getHealthInfo,
  updateHealthInfo,
} from "../controllers/user.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 건강 정보 API
 */

/**
 * @swagger
 * /user/health:
 *   post:
 *     summary: 사용자 건강 정보 등록
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - birthdate
 *               - gender
 *               - diseaseId
 *             properties:
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               diseaseId:
 *                 type: integer
 *                 example: 1
 *               proteinLimit:
 *                 type: number
 *                 example: 60.5
 *               sugarLimit:
 *                 type: number
 *                 example: 30
 *               sodiumLimit:
 *                 type: number
 *                 example: 2000
 *               notes:
 *                 type: string
 *                 example: "고혈압 주의 필요"
 *     responses:
 *       201:
 *         description: 사용자 건강 정보 등록 성공
 */
router.post("/health", authenticate, createHealthInfo);

/**
 * @swagger
 * /user/health:
 *   get:
 *     summary: 사용자 건강 정보 조회
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 건강 정보 반환
 */
router.get("/health", authenticate, getHealthInfo);

/**
 * @swagger
 * /user/health:
 *   put:
 *     summary: 사용자 건강 정보 수정
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - diseaseId
 *             properties:
 *               diseaseId:
 *                 type: integer
 *                 example: 1
 *               proteinLimit:
 *                 type: number
 *                 example: 55.0
 *               sugarLimit:
 *                 type: number
 *                 example: 25
 *               sodiumLimit:
 *                 type: number
 *                 example: 1800
 *               notes:
 *                 type: string
 *                 example: "영양사 상담 후 조정됨"
 *     responses:
 *       200:
 *         description: 수정 성공
 *       404:
 *         description: 기존 데이터 없음
 */
router.put("/health", authenticate, updateHealthInfo);

export default router;

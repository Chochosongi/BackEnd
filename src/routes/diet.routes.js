import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  addFoodToLog,
  createDietLog,
  getAllDietLogs,
  getDietLogDetail,
  removeFoodFromLog,
  getDietLogsByDate,
} from "../controllers/diet.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Diet
 *   description: 식단 관리 API
 */

/**
 * @swagger
 * /diet:
 *   post:
 *     summary: 식단 생성
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-07"
 *               mealType:
 *                 type: string
 *                 example: "아침"
 *               notes:
 *                 type: string
 *                 example: "샐러드 먹음"
 *     responses:
 *       201:
 *         description: 식단 생성 성공
 */
router.post("/", authenticate, createDietLog);

/**
 * @swagger
 * /diet/{logId}/food:
 *   post:
 *     summary: 식단에 음식 추가
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: logId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 식단 로그 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodId:
 *                 type: integer
 *               amount:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: 음식 추가 성공
 */
router.post("/:logId/food", authenticate, addFoodToLog);

/**
 * @swagger
 * /diet:
 *   get:
 *     summary: 내 모든 식단 조회
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 식단 목록 반환
 */
router.get("/", authenticate, getAllDietLogs);

/**
 * @swagger
 * /diet/{logId}:
 *   get:
 *     summary: 특정 식단 상세 조회
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: logId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 식단 로그 ID
 *     responses:
 *       200:
 *         description: 식단 상세 정보 반환
 *       404:
 *         description: 식단 없음
 */
router.get("/:logId", authenticate, getDietLogDetail);

/**
 * @swagger
 * /diet/{logId}/food/{foodId}:
 *   delete:
 *     summary: 식단에서 음식 제거
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: logId
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: foodId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: 삭제 성공
 */
router.delete("/:logId/food/:foodId", authenticate, removeFoodFromLog);

/**
 * @swagger
 * /diet/logs:
 *   get:
 *     summary: 날짜별 식단 조회
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: 조회할 날짜 (예: 2025-05-13)
 *     responses:
 *       200:
 *         description: 날짜별 식단 정보 반환
 */
router.get("/logs", authenticate, getDietLogsByDate);

export default router;

import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createFood,
  getFoodById,
  searchFoods,
} from "../controllers/food.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Food
 *   description: 음식 관련 API
 */

/**
 * @swagger
 * /food/search:
 *   get:
 *     summary: 식품명으로 음식 검색 (OpenAPI + DB 통합)
 *     tags: [Food]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: 검색할 식품명
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 검색 성공
 *       400:
 *         description: 검색어 없음
 *       500:
 *         description: 서버 에러
 */
router.get("/search", searchFoods);

/**
 * @swagger
 * /food/{id}:
 *   get:
 *     summary: ID로 음식 정보 조회
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 음식 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *       404:
 *         description: 음식 없음
 *       500:
 *         description: 서버 에러
 */
router.get("/:id", getFoodById);

/**
 * @swagger
 * /food:
 *   post:
 *     summary: 새로운 음식 등록
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               barcode:
 *                 type: string
 *               calories:
 *                 type: number
 *               protein:
 *                 type: number
 *               fat:
 *                 type: number
 *               carbs:
 *                 type: number
 *               sugar:
 *                 type: number
 *               sodium:
 *                 type: number
 *               servingSize:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: 등록 성공
 *       409:
 *         description: 중복 바코드
 *       500:
 *         description: 서버 에러
 */
router.post("/", authenticate, createFood);

export default router;

import express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import dietRoutes from "./routes/diet.routes.js";
import foodRoutes from "./routes/food.routes.js";
import imageRoutes from "./routes/image.routes.js";

dotenv.config();

const app = express();

// 미들웨어
app.use(json());

// 라우터
app.use("/", router);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/diet", dietRoutes);
app.use("/food", foodRoutes);
app.use("/image", imageRoutes);
app.use("/uploads", express.static("uploads")); // 이미지 정적 경로 서빙

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

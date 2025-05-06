import express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import dietRoutes from "./routes/diet.routes.js";
import foodRoutes from "./routes/food.routes.js";
import imageRoutes from "./routes/image.routes.js";
import postRoutes from "./routes/post.routes.js";
import { specs, swaggerUi } from "./swagger.js"; // ✅ 정확한 경로로 수정

dotenv.config();

const app = express();
app.use(json());

// ✅ Swagger UI 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// 라우터 설정
app.use("/", router);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/diet", dietRoutes);
app.use("/food", foodRoutes);
app.use("/image", imageRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/community/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

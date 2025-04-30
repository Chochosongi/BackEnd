import express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// 미들웨어
app.use(json());

// 라우터
app.use("/", router);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

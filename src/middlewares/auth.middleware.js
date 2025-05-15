import { verifyToken } from "../utils/jwt.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 🚫 블랙리스트 확인
    const blacklisted = await prisma.tokenBlackList.findUnique({
      where: { token },
    });

    if (blacklisted) {
      return res.status(401).json({ message: "Logged out token" });
    }

    // ✅ 토큰 유효성 검증
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

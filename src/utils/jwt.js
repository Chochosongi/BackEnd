import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function generateToken(user) {
  return sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return verify(token, JWT_SECRET);
}

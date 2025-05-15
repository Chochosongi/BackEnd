import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

export async function signUp(req, res) {
  const { email, password, name, provider = "email" } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "이미 가입된 이메일입니다. " });

    const hashed = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        provider,
      },
    });

    const token = generateToken(user);
    res.status(201).json({ token, userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "회원가입 실패" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "유저 없음" });

    const match = await compare(password, user.password);
    if (!match) return res.status(401).json({ message: "비밀번호 틀림" });

    const token = generateToken(user);
    res.status(200).json({ token, userId: user.id });
  } catch (err) {
    res.status(500).json({ message: "로그인 실패" });
  }
}

export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(400)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 이미 로그아웃된 토큰인지 확인
    const exists = await prisma.tokenBlackList.findUnique({ where: { token } });
    if (exists) {
      return res.status(400).json({ message: "Token already blacklisted" });
    }

    // 블랙리스트에 등록
    await prisma.tokenBlacklist.create({ data: { token } });

    res.status(200).json({ message: "로그아웃 완료" });
  } catch (err) {
    console.error("로그아웃 실패:", err);
    res.status(500).json({ message: "로그아웃 실패", error: err.message });
  }
};

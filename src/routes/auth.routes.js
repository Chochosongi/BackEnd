import { Router } from "express";
const router = Router();
import { signUp, login } from "../controllers/auth.controller";

router.post("/signup", signUp);
router.post("/login", login);

export default router;

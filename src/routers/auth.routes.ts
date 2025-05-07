import { Router } from "express";
import AuthController from "../controllers/authController.ts";
import { logInMiddleware } from "../middlewares/auth/logInMiddleware.ts";

const router = Router();

router.get("/google", AuthController.googleAuth);
router.get(
  "/google/callback",
  logInMiddleware,
  AuthController.redirectAfterSucces
);
export default router;

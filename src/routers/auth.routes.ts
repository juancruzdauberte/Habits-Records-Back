import { Router } from "express";
import AuthController from "../controllers/authController.ts";
import { logInMiddleware } from "../middlewares/auth/logInMiddleware.ts";
import { isAuthenticated } from "../middlewares/auth/authenticatedMiddleware.ts";

const router = Router();

router.get("/google", AuthController.googleAuth);
router.get(
  "/google/callback",
  logInMiddleware,
  AuthController.redirectAfterLogin
);
router.get("/status", isAuthenticated, AuthController.userStatus);
router.get("/logout", isAuthenticated, AuthController.logOut);

export default router;

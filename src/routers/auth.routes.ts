import { Router } from "express";
import AuthController from "../controllers/authController.ts";
import { logInMiddleware } from "../middlewares/auth/logInMiddleware.ts";
import { authRequire } from "../middlewares/requests/authenticatedMiddleware.ts";

const router = Router();

router.get("/google", AuthController.googleAuth);
router.get(
  "/google/callback",
  logInMiddleware,
  AuthController.redirectAfterLogin
);
router.get("/status", authRequire, AuthController.userStatus);
router.get("/logout", authRequire, AuthController.logOut);

export default router;

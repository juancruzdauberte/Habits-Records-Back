import { Router } from "express";
import HabitController from "../controllers/habitController";
import { habitSchema } from "../middlewares/habits/habitSchemaValidator";
import { habitValidator } from "../middlewares/habits/habitValidator";
import { authRequire } from "../middlewares/requests/authRequire";

const router = Router();

router.post(
  "/",
  authRequire,
  habitSchema,
  habitValidator,
  HabitController.createHabit
);

export default router;

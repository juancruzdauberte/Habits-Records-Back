import { Router } from "express";
import HabitController from "../controllers/habitController";
import { habitSchema } from "../middlewares/habits/habitSchemaValidator";
import { habitValidator } from "../middlewares/habits/habitValidator";
import { authRequire } from "../middlewares/requests/authenticatedMiddleware";

const router = Router();

router.post(
  "/",
  authRequire,
  habitSchema,
  habitValidator,
  HabitController.createHabit
);
router.get("/", authRequire, HabitController.getHabits);
router.delete("/:id", authRequire, HabitController.deleteHabit);
router.patch(
  "/:id",
  authRequire,
  habitSchema,
  habitValidator,
  HabitController.updateHabit
);

export default router;

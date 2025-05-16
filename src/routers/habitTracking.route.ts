import { Router } from "express";
import { authRequire } from "../middlewares/requests/authenticatedMiddleware";
import HabitTrackingController from "../controllers/habitTracking";

const router = Router();

router.get("/", authRequire, HabitTrackingController.getHabitsForToday);
router.post("/", authRequire, HabitTrackingController.toggleHabitCompleted);
router.get(
  "/:date",
  authRequire,
  HabitTrackingController.getHabitsTrackingForDate
);
export default router;

import { Router } from "express";
import { authRequire } from "../middlewares/requests/authRequire";
import HabitTrackingController from "../controllers/habitTracking";

const router = Router();

router.get("/", authRequire, HabitTrackingController.getHabitsTracking);
router.post("/", authRequire, HabitTrackingController.toggleHabitCompleted);

export default router;

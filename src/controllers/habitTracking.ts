import { Request, Response } from "express";
import HabitsTracking from "../models/HabitTracking";
import { AuthenticatedRequest } from "../types/types";
import Habits from "../models/Habit";

class HabitTrackingController {
  static getHabitsTracking = async (req: Request, res: Response) => {
    const { id } = (req as AuthenticatedRequest).user!;
    try {
      const tracking = await HabitsTracking.find({ user: id });
      if (!tracking) {
        res.status(404).json({ message: "Lista de tracking no encontrada" });
        return;
      }
      res.status(200).json({
        message: "Tracking de hábitos obtenidos correctamente",
        tracking,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error al obtener el tracking de los hábitos" });
    }
  };

  static toggleHabitCompleted = async (req: Request, res: Response) => {
    const { habitId } = req.body;
    const { id: userId } = (req as AuthenticatedRequest).user!;

    if (!habitId) {
      res.status(400).json({ message: "Falta el ID del hábito" });
      return;
    }

    try {
      const habit = await Habits.findOne({ _id: habitId, user: userId });
      if (!habit) {
        res.status(404).json({ message: "Hábito del usuario no encontrado" });
        return;
      }

      const today = new Date();

      const alreadyCompleted = await HabitsTracking.findOne({
        habit: habitId,
        date: today,
      });

      if (alreadyCompleted?.completed) {
        res
          .status(409)
          .json({ message: "El hábito ya se ha realizado el día de hoy" });
        return;
      }

      const tracking = await HabitsTracking.create({
        habit: habitId,
        date: today,
        completed: true,
        user: userId,
      });

      res
        .status(201)
        .json({ message: "Hábito realizado correctamente", tracking });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error al registrar el tracking del hábito" });
    }
  };
}

export default HabitTrackingController;

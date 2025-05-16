import { Request, Response } from "express";
import HabitsTracking from "../models/HabitTracking";
import { AuthenticatedRequest } from "../types/types";
import Habits from "../models/Habit";

class HabitTrackingController {
  static getHabitsTracking = async (req: Request, res: Response) => {
    const { id: userId } = (req as AuthenticatedRequest).user!;
    try {
      const habits = await HabitsTracking.find({ user: userId })
        .populate("habit", "title description")
        .populate("user", "email")
        .exec();
      if (!habits) {
        res
          .status(404)
          .json({ message: "Lista de seguimiento de habitos no encontrada" });
        return;
      }

      res.status(200).json({
        habits,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error al obtener el tracking de los hábitos" });
    }
  };

  static toggleHabitCompleted = async (req: Request, res: Response) => {
    const { id } = req.body;
    const { id: userId } = (req as AuthenticatedRequest).user!;

    if (!id) {
      res.status(400).json({ message: "Falta el ID del hábito" });
      return;
    }

    try {
      const habit = await Habits.findOne({ _id: id, user: userId });
      if (!habit) {
        res.status(404).json({ message: "Hábito del usuario no encontrado" });
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const alreadyCompleted = await HabitsTracking.findOne({
        habit: id,
        date: today,
      });

      if (alreadyCompleted?.completed) {
        res
          .status(409)
          .json({ message: "El hábito ya se ha realizado el día de hoy" });
        return;
      }

      const tracking = await HabitsTracking.create({
        habit: id,
        date: today,
        completed: true,
        user: userId,
      });

      const populatedTracking = await HabitsTracking.findById(tracking.id)
        .populate("habit", "title description")
        .populate("user", "email")
        .exec();

      res.status(201).json({
        message: "Hábito realizado correctamente",
        tracking: populatedTracking,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error al registrar el tracking del hábito" });
    }
  };

  static getHabitsForToday = async (req: Request, res: Response) => {
    const { id: userId } = (req as AuthenticatedRequest).user!;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
      const habits = await Habits.find({ user: userId });

      const trackings = await HabitsTracking.find({
        date: today,
        user: userId,
      });

      const response = habits.map((habit) => {
        const tracking = trackings.find(
          (t) => t.habit.toString() === habit._id?.toString()
        );

        return {
          id: habit.id,
          completed: tracking ? tracking.completed : false,
          description: habit.description,
          title: habit.title,
          doIn: habit.doIn,
        };
      });

      res.status(200).json({ habits: response });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al obtener los habitos del dia de hoy" });
    }
  };

  static getHabitsTrackingForDate = async (req: Request, res: Response) => {
    const { date } = req.params;
    const { id: userId } = (req as AuthenticatedRequest).user!;
    try {
      const habits = await Habits.find({ user: userId });

      const parsed = new Date(date);
      parsed.setHours(0, 0, 0, 0);

      const start = parsed;
      const end = new Date(parsed);
      end.setDate(end.getDate() + 1);

      const trackings = await HabitsTracking.find({
        date: { $gte: start, $lt: end },
        user: userId,
      });

      const response = habits.map((habit) => {
        const tracking = trackings.find(
          (t) => t.habit.toString() === habit._id?.toString()
        );

        return {
          id: habit.id,
          completed: tracking ? tracking.completed : false,
          description: habit.description,
          title: habit.title,
          doIn: habit.doIn,
        };
      });

      res.status(200).json({ habits: response });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los habitos de la fecha seleccionada",
      });
      return;
    }
  };
}

export default HabitTrackingController;

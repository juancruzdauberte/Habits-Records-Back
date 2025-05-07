import { Response } from "express";
import Habits from "../models/Habit";
import {
  type AuthenticatedRequest,
  type CreateHabitBody,
} from "../types/types";

class HabitController {
  static createHabit = async (
    req: AuthenticatedRequest & { body: CreateHabitBody },
    res: Response
  ) => {
    const { title, description } = req.body;
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const { id } = req.user;

    const habit = new Habits({
      title,
      description,
      user: id,
    });

    try {
      await habit.save();
      res.status(201).json({ message: "Hábito creado", habit });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el hábito" });
      return;
    }
  };
}

export default HabitController;

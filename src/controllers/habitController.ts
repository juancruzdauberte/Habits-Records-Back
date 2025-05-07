import { Response } from "express";
import Habits from "../models/Habit";
import { type HabitRequest } from "../types/types";

class HabitController {
  static createHabit = async (req: HabitRequest, res: Response) => {
    try {
      const { title, description } = req.body;
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }
      const { id } = req.user;

      const titleDuplicate = await Habits.findOne({ title, user: id });

      if (titleDuplicate) {
        res.status(409).json({ message: "Ya existe un hábito con ese título" });
        return;
      }

      const habit = new Habits({
        title,
        description,
        user: id,
      });
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

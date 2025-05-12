import { Request, Response } from "express";
import Habits from "../models/Habit";
import { AuthenticatedRequest, type HabitRequest } from "../types/types";

class HabitController {
  static createHabit = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }
      const { id } = (req as HabitRequest).user!;

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

  static getHabits = async (req: Request, res: Response) => {
    const { id } = (req as AuthenticatedRequest).user!;
    try {
      const habits = await Habits.find({ user: id }).populate("user", "email");

      if (!habits || habits.length === 0) {
        res.status(404).json({ message: "No existen habitos para el usuario" });
        return;
      }
      res
        .status(200)
        .json({ message: "Hábitos obtenidos exitosamente", habits });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener todos los hábitos" });
    }
  };

  static deleteHabit = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const habit = Habits.findById(id);

      if (!habit) {
        res.status(404).json({ message: "Hábito no encontrado" });
        return;
      }

      await Habits.findByIdAndDelete(id);
      res.status(200).json({ message: "Habito eliminado exitosamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar el hábito" });
    }
  };

  static updateHabit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const habit = await Habits.findByIdAndUpdate(id, data, { new: true });

      if (!habit) {
        res.status(404).json({ message: "Hábito no encontrado" });
        return;
      }

      res.status(200).json({ message: "Hábito actualizado", habit: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al actulizar el hábito" });
    }
  };
}

export default HabitController;

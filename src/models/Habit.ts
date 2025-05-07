import { Schema, model } from "mongoose";
import { type HabitModel } from "../types/types";

const HabitSchema: Schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "El titulo es requerido"],
    },
    description: {
      type: String,
      default: "",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Habits = model<HabitModel>("Habits", HabitSchema);

export default Habits;

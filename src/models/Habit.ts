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
    doIn: {
      type: String,
      default: "",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
      index: true,
    },
  },
  { timestamps: true }
);

HabitSchema.index({ user: 1, title: 1 }, { unique: true });

const Habits = model<HabitModel>("Habits", HabitSchema);

export default Habits;

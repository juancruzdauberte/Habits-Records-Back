import { Schema, model } from "mongoose";
import { type HabitTrackingModel } from "../types/types";

const HabitTrackingSchema: Schema = new Schema(
  {
    habit: {
      type: Schema.Types.ObjectId,
      ref: "Habits",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      set: (d: Date) => new Date(d.toISOString().split("T")[0]),
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

HabitTrackingSchema.index({ habit: 1, date: 1 }, { unique: true });

const HabitsTracking = model<HabitTrackingModel>(
  "HabitsTracking",
  HabitTrackingSchema
);

export default HabitsTracking;

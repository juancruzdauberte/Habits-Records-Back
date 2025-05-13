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
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
      index: true,
    },
  },
  { timestamps: true }
);

HabitTrackingSchema.index({ habit: 1, date: 1 }, { unique: true });
HabitTrackingSchema.index({ user: 1, date: 1 });

const HabitsTracking = model<HabitTrackingModel>(
  "HabitsTracking",
  HabitTrackingSchema
);

export default HabitsTracking;

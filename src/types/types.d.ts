import { Document, Types } from "mongoose";

export interface UserModel extends Document {
  email: string;
  name: string;
  googleId: string;
}

export interface HabitModel extends Document {
  title: string;
  description?: string;
  user: Types.ObjectId;
}

export interface HabitTrackingModel extends Document {
  habit: Types.ObjectId;
  date: Date;
  completed: boolean;
}

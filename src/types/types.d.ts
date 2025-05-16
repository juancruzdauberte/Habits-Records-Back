import { Request } from "express";
import { Document, Types } from "mongoose";

export type UserModel = Document & {
  email: string;
  name: string;
  googleId: string;
  picture: string;
};

export type UserPayload = {
  id: string;
  email: string;
};

export type AuthenticatedRequest = Request & {
  user?: UserPayload;
};

type CreateHabitBody = {
  title: string;
  description: string;
};

export type HabitRequest = AuthenticatedRequest & {
  body: CreateHabitBody;
};

type doInType = "Mañana" | "Tarde" | "Noche" | "";

export type HabitModel = Document & {
  title: string;
  description?: string;
  doIn: doInType;
  user: Types.ObjectId;
};

export type HabitTrackingModel = Document & {
  habit: Types.ObjectId;
  date: Date;
  completed: boolean;
};

import { Request } from "express";
import { Document, Types } from "mongoose";

export type UserModel = Document & {
  email: string;
  name: string;
  googleId: string;
  picture: string;
};

type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    email: string;
  };
};

type CreateHabitBody = {
  title: string;
  description: string;
};

export type HabitRequest = AuthenticatedRequest & {
  body: CreateHabitBody;
};

export type JwtPayloadUser = {
  id: string;
  email: string;
  googleId: string;
};

export type HabitModel = Document & {
  title: string;
  description?: string;
  user: Types.ObjectId;
};

export type HabitTrackingModel = Document & {
  habit: Types.ObjectId;
  date: Date;
  completed: boolean;
};

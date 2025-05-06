import { Schema, model } from "mongoose";
import { type UserModel } from "../types/types";

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "El correo es requerido"],
      trim: true,
      unique: [true, "El correo debe ser unico "],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      trim: true,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordCode: {
      type: String,
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Users = model<UserModel>("Users", UserSchema);

export default Users;

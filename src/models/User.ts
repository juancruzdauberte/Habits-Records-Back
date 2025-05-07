import { Schema, model } from "mongoose";
import { type UserModel } from "../types/types";

const UserSchema: Schema = new Schema(
  {
    googleId: {
      type: String,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Users = model<UserModel>("Users", UserSchema);

export default Users;

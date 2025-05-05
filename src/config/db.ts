import mongoose from "mongoose";
import config from "./config";
import { exit } from "node:process";

export async function connectDB() {
  try {
    const connection = await mongoose.connect(config.DB_URI!);
    const url = `${connection.connection.host} : ${connection.connection.port}`;
    console.log(`MongoDB corriendo en ${url}`);
  } catch (error) {
    console.log("Error al conectar MongoDB", error);
    exit(1);
  }
}

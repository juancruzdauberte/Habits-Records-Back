import express from "express";
import { connectDB } from "./config/db";
import config from "./config/config";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

connectDB();
const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

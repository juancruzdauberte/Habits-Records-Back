import express from "express";
import { connectDB } from "./config/db";
import config from "./config/config";

connectDB();
const app = express();
app.use(express.json());

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

import express from "express";
import { connectDB } from "./config/db";
import config from "./config/config";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routers/auth.routes.ts";
import habitRoutes from "./routers/habits.routes.ts";
import habitsTrackingRoutes from "./routers/habitTracking.route.ts";
import { configurePaspport } from "./config/passport.ts";
import passport from "passport";
import session from "express-session";

connectDB();
const app = express();
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apis.google.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
configurePaspport();
app.use(passport.initialize());

app.use(
  session({
    secret: config.EXPRESS_SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

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

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/habitstracking", habitsTrackingRoutes);

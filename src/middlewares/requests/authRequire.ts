import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../../config/config";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token requerido" });
    return;
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET!);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalido o expirado" });
  }
};

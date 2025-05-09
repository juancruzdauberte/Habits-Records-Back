import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import config from "../../config/config";
import { type UserPayload } from "../../types/types";

export const authRequire = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Se requiere el token" });
    return;
  }

  jwt.verify(token, config.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Token inválido o expirado" });
      return;
    }
    const user = decoded as UserPayload;

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  });
};

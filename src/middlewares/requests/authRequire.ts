import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import config from "../../config/config";
import {
  type AuthenticatedRequest,
  type JwtPayloadUser,
} from "../../types/types";

export const authRequire = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token requerido" });
    return;
  }

  jwt.verify(token, config.JWT_SECRET!, (err, decoded) => {
    if (err || typeof decoded !== "object") {
      res.status(403).json({ message: "Token inválido o expirado" });
      return;
    }
    const user = decoded as JwtPayloadUser;

    req.user = {
      id: user.id,
      email: user.email,
      googleId: user.googleId,
    };
    next();
  });
};

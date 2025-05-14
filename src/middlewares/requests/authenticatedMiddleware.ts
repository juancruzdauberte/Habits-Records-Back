import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { AuthenticatedRequest, UserPayload } from "../../types/types";

export const authRequire = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ login: false, message: "Token no encontrado" });
    return;
  }

  try {
    const user = jwt.verify(token, config.JWT_SECRET!) as UserPayload;
    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    res.status(401).json({ login: false, message: "Token inválido" });
    return;
  }
};

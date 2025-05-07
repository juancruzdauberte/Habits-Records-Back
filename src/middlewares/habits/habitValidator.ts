import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const habitValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ error: result.array() });
    return;
  }
  next();
};

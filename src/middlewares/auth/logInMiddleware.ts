import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const logInMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("google", { session: false }, (err, user, _info) => {
    if (err || !user) {
      return res.status(401).json({ message: "Autenticación fallida" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

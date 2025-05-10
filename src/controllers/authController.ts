import passport from "passport";
import { Response, Request, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/types";
import { generateJwt } from "../utils/generateJwt";
import jwt from "jsonwebtoken";
import config from "../config/config";
class AuthController {
  static googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  static redirectAfterLogin = (req: Request, res: Response) => {
    const { id, email } = (req as AuthenticatedRequest).user!;
    const token = generateJwt({ id, email });
    // res.status(200).json({
    //   message: "Autenticación exitosa",
    //   token,
    // });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    res.redirect(`${config.CLIENT_URL}/home`);
  };

  static logOut = (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res.redirect(`${config.CLIENT_URL}`);
    });
  };

  static userStatus = (req: Request, res: Response) => {
    if (req.user) {
      res.json({ login: true, user: req.user });
      return;
    } else {
      res.status(401).json({ login: false });
      return;
    }
  };
}

export default AuthController;

import passport from "passport";
import { Response, Request } from "express";
import { AuthenticatedRequest } from "../types/types";
import { generateJwt } from "../utils/generateJwt";
import config from "../config/config";

class AuthController {
  static googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  static redirectAfterLogin = (req: Request, res: Response) => {
    const { id, email } = (req as AuthenticatedRequest).user!;
    const token = generateJwt({ id, email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2,
    });

    // res.status(200).json({
    //   message: "Autenticación exitosa",
    //   token,
    // });

    res.redirect(`${config.CLIENT_URL}/home`);
  };

  static logOut = (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        res.status(500).json({ message: "Error al cerrar sesión" });
        return;
      }
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      res.status(200).json({ message: "Sesión cerrada exitosamente" });
    });
  };

  static userStatus = (req: Request, res: Response) => {
    if (req.user) {
      res.json({ login: true, user: req.user });
      return;
    } else {
      res.status(401).json({ login: false, user: null });
      return;
    }
  };
}

export default AuthController;

import passport from "passport";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

class AuthController {
  static googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  static redirectAfterSucces = (req: Request, res: Response) => {
    const user = req.user as { id: string; email: string };
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET!,
      {
        expiresIn: "30m",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 60 * 1000,
    });
    res.redirect("http://localhost:2173/home");
  };
}

export default AuthController;

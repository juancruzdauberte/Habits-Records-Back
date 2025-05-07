import passport from "passport";
import { Response, Request } from "express";

class AuthController {
  static googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  static redirectAfterSucces = (req: Request, res: Response) => {
    const user: any = req.user;

    res.status(200).json({
      message: "Autenticación exitosa",
      user: {
        id: user.id,
        email: user.email,
      },
      token: user.token,
    });
  };
}

export default AuthController;

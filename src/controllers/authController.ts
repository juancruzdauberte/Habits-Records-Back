import passport from "passport";
import { Response, Request } from "express";
import { AuthenticatedRequest } from "../types/types";
import { generateJwt } from "../utils/generateJwt";
class AuthController {
  static googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  static redirectAfterLogin = (req: Request, res: Response) => {
    const { id, email } = (req as AuthenticatedRequest).user!;
    const token = generateJwt({ id, email });
    res.status(200).json({
      message: "Autenticación exitosa",
      token,
    });

    // res.redirect(`${config.CLIENT_URL}/home`);
  };

  static logOut = () => {};
}

export default AuthController;

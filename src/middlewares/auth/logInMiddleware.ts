import passport from "passport";
import config from "../../config/config";

export const logInMiddleware = passport.authenticate("google", {
  failureRedirect: `${config.CLIENT_URL}/errorlogin`,
  failureMessage: "Access denied",
});

import passport from "passport";

export const logInMiddleware = passport.authenticate("google", {
  failureRedirect: "http://localhost:2173/errorlogin",
  failureMessage: "Access denied",
});

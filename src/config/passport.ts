import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config";
import Users from "../models/User";

export const configurePaspport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID!,
        clientSecret: config.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/api/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          let user = await Users.findOne({ googleId: profile.id });
          if (!user) {
            user = new Users({
              googleId: profile.id,
              email: profile.emails?.[0].value,
              name: profile.displayName,
              picture: profile.photos?.[0].value,
            });
            await user.save();
          }
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};

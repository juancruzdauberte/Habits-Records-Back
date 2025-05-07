import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config";
import Users from "../models/User";
import { UserModel } from "../types/types";
import { HydratedDocument } from "mongoose";
import jwt from "jsonwebtoken";

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
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name,
              googleId: user.googleId,
            },
            config.JWT_SECRET!,
            { expiresIn: "1h" }
          );

          const userWithToken = {
            ...user.toObject(),
            token,
          };

          return done(null, userWithToken);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.googleId);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await Users.findById({ googleId: id });
      done(null, user as HydratedDocument<UserModel>);
    } catch (error) {
      done(error, null);
    }
  });
};

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";

const emailSchema = z.string().email();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // const email = profile.emails?.[0]?.value;
      // if (!email) {
      //   return done(new Error("Email is required!"), undefined);
      // }

      // // Validate Email Format
      // const emailCheck = emailSchema.safeParse(email);
      // if (!emailCheck.success) {
      //   return done(new Error("Invalid email format!"), undefined);
      // }

      // // Optional: Check if email is from a specific domain
      // if (!email.endsWith("@techraq.com")) {
      //   return done(new Error("Only company emails allowed!"), undefined);
      // }
      done(null, profile);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});

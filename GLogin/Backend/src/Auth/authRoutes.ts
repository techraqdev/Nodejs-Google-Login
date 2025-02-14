import express, { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
export const authRoutes = express.Router();

authRoutes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    const token = jwt.sign(
      { id: user.id, name: user.displayName, email: user.emails[0].value },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.redirect(process.env.FRONTEND_URL!);
  }
);

authRoutes.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});
authRoutes.get("/user", (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
});

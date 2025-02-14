import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import "./Auth/AuthMiddleware";
import { authRoutes } from './Auth/authRoutes';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true
}))

app.use(session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);

if(!process.env.PORT) {
    new Error('No port defined');
}
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
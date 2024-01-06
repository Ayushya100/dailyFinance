"use strict";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { usersAPI } from "./constants.js";

// Import Routes
import userRoutes from './routes/user-routes/index.js';

const app = express();

// Setting up Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "32kb" // Maximum request body size.
}));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(express.static("public"));

app.use(cookieParser());

// User Routes
app.use(`${usersAPI}/createUser`, userRoutes.createUserAPI);
app.use(`${usersAPI}/verify`, userRoutes.verifyUserAPI);

export default app;
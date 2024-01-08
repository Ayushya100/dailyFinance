"use strict";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { usersAPI } from "./constants.js";

// Import Routes
import userRoutes from './routes/user-routes/index.js';
import errorHandler from "./middlewares/errorHandler.middleware.js";

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
app.use(`${usersAPI}/create-user`, userRoutes.createUserAPI);
app.use(`${usersAPI}/verify`, userRoutes.verifyUserAPI);
app.use(`${usersAPI}/user-login`, userRoutes.userLoginAPI);
app.use(`${usersAPI}/get-user-info`, userRoutes.getUserInfoAPI);
app.use(`${usersAPI}/update-user-details`, userRoutes.updateUserDetailsAPI);
app.use(`${usersAPI}/update-user-password`, userRoutes.updateUserPasswordAPI);
app.use(`${usersAPI}/update-profile-image`, userRoutes.uploadProfileImageAPI);
app.use(`${usersAPI}/refresh-token`, userRoutes.refreshAccessTokenAPI);

// Error handler middleware
app.use(errorHandler);

export default app;

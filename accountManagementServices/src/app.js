"use strict";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

export default app;
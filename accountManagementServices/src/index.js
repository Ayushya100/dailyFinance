"use strict";

import dotenv from "dotenv";
import dbConnection from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './env'
})

dbConnection()
.then(() => {
    const port = process.env.PORT || 4800;
    app.listen(port, () => {
        console.log(`Server started at port: ${port}`);
    });
}).catch((err) => {
    console.log('DB Connection failed! ', err);
});
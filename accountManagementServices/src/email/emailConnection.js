"use strict";

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const handlebarsOptions = {
    viewEngine: {
        extname: '.hbs',
        partialsDir: path.resolve("./src/templates"),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/templates'),
    extName: '.hbs'
};

transporter.use('compile', hbs(handlebarsOptions));

export default transporter;

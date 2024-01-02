"use strict";

import transporter from "./emailConnection.js";
import { FRONTEND_URL } from '../constants.js';

// Verification Mail Service
const sendVerificationMail = (custId, emailId, fullName, verificationCode) => {
    const mailOptions = {
        from: 'dailyFinance',
        to: emailId,
        subject: 'Welcome to dailyFinance - Verify Your Email and Activate Your Account',
        template: 'verificationMail',
        context: {
            fullName: fullName,
            verificationCode: FRONTEND_URL + "/verify/" + custId + "/" + Date.now() + "/" + verificationCode,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${emailId}`);
        }
    });
};

export default sendVerificationMail;

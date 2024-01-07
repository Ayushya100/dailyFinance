"use strict";

import transporter from "./emailConnection.js";

const passwordUpdatedSuccessfullyMail = (emailId, fullName) => {
    const mailOptions = {
        from: 'dailyFinance',
        to: emailId,
        subject: 'Password Updated Successfully',
        template: 'passwordUpdatedMail',
        context: {
            fullName: fullName,
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

export default passwordUpdatedSuccessfullyMail;

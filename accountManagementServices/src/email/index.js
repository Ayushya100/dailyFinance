"use strict";

import transporter from "./emailConnection.js";
import sendVerificationMail from "./sendVerificationMail.js";
import accountVerifiedSuccessfullMail from "./sendAccountVerifiedMail.js";
import accountReactivatedMail from "./accountReactivatedMail.js";
import userDetailsUpdatedSuccessfullyMail from "./userDetailsUpdatedMail.js";
import passwordUpdatedSuccessfullyMail from "./userPasswordUpdatedMail.js";

export default {
    emailConnection: transporter,
    sendVerificationMail: sendVerificationMail,
    accountVerifiedSuccessfullMail: accountVerifiedSuccessfullMail,
    accountReactivatedMail: accountReactivatedMail,
    userDetailsUpdatedSuccessfullyMail: userDetailsUpdatedSuccessfullyMail,
    passwordUpdatedSuccessfullyMail: passwordUpdatedSuccessfullyMail
};

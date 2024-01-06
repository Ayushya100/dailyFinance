"use strict";

import transporter from "./emailConnection.js";
import sendVerificationMail from "./sendVerificationMail.js";
import accountVerifiedSuccessfullMail from "./sendAccountVerifiedMail.js";

export default {
    emailConnection: transporter,
    sendVerificationMail: sendVerificationMail,
    accountVerifiedSuccessfullMail: accountVerifiedSuccessfullMail
};

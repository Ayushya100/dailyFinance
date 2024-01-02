"use strict";

import transporter from "./emailConnection.js";
import sendVerificationMail from "./sendVerificationMail.js";

export default {
    emailConnection: transporter,
    sendVerificationMail: sendVerificationMail
};

"use strict";

import dbConnect from "../../db/index.js";
import emailServices from "../../email/index.js";

const updateUserDetails = async(userId, payload) => {
    try {
        const updatedUser = await dbConnect.updateUserDetails(userId, payload);
        emailServices.userDetailsUpdatedSuccessfullyMail(updatedUser);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'USER UPDATED SUCCESSFULLY',
            data: updatedUser,
            isValid: true
        };
    } catch(err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'SOME ERROR OCCURRED WHILE SAVING DATA IN DB',
            isValid: false
        };
    }
};

export {
    updateUserDetails
};

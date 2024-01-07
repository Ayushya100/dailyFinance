"use strict";

import dbConnect from "../../db/index.js";
import emailService from "../../email/index.js";

const updateUserPassword = async(userId, payload) => {
    try {
        if (payload.oldPassword !== payload.newPassword) {
            const isPasswordUpdated = await dbConnect.updateUserPassword(userId, payload);
            if (isPasswordUpdated) {
                emailService.passwordUpdatedSuccessfullyMail(isPasswordUpdated.emailId, isPasswordUpdated.firstName + " " + isPasswordUpdated.lastName);
                return {
                    resType: 'REQUEST_COMPLETED',
                    resMsg: 'PASSWORD UPDATED',
                    data: isPasswordUpdated,
                    isValid: true
                };
            }
            return {
                resType: 'UNAUTHORIZED',
                resMsg: 'UNAUTHORIZED USER',
                isValid: false
            };
        }
        return {
            resType: 'BAD_REQUEST',
            resMsg: 'NEW PASSWORD CANNOT BE SAME AS OLD',
            isValid: false
        }
    } catch (err) {
         
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'SOME ERROR OCCURRED WHILE SAVING DATA',
            isValid: false
        }
    }
};

export { updateUserPassword };

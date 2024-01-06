"use strict";

import dbConnect from "../../db/index.js";
import emailService from "../../email/index.js";

const checkUserById = async(userId) => {
    const response = {
        resType: 'NOT_FOUND',
        resMsg: 'USER NOT FOUND',
        isValid: false
    };
    const isUserAvailable = await dbConnect.isUserByIdAvailable(userId);

    if (isUserAvailable) {
        response.resType = 'SUCCESS';
        response.resMsg = 'VALIDATION SUCCESSFULL';
        response.isValid = true;
    }
    return response;
};

const verifyUser = async(payload) => {
    const currentTime = Date.now();
    const verificationTime = Math.ceil((currentTime - payload.requestTime) / (6 * 60 * 60 * 1000));

    const userInfo = await dbConnect.isUserByIdAvailable(payload.userId);

    if ((verificationTime <= 1) && (userInfo.verificationCode === payload.verificationCode)) {
        const validateUser = await dbConnect.validateNewUser(payload.userId);
        
        emailService.accountVerifiedSuccessfullMail(validateUser);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'REQUEST COMPLETED',
            data: validateUser,
            isValid: true
        };
    }

    return {
        resType: 'BAD_REQUEST',
        resMsg: 'USER VERIFICATION FAILED',
        isValid: false
    };
};

export {
    checkUserById,
    verifyUser
};

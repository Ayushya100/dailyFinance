"use strict";

import dbConnect from "../../db/index.js";
import emailServices from "../../email/index.js";

const isUserValid = async(payload) => {
    const isUserAvailable = await dbConnect.isUserByEmailUsernameAvailable(payload.userNameOrEmail);
    
    if (isUserAvailable) {
        const isPasswordCorrect = await dbConnect.validateUserPassword(isUserAvailable, payload.password);
        
        if (isPasswordCorrect) {
            return {
                resType: 'SUCCESS',
                resMsg: 'VALIDATION SUCCESSFULL',
                data: isUserAvailable,
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
        resType: 'NOT_FOUND',
        resMsg: 'USER NOT FOUND',
        isValid: false
    }
};

const isUserVerified = async(payload) => {
    if (payload.isVerified) {
        return {
            resType: 'SUCCESS',
            resMsg: 'VALIDATION SUCCESSFULL',
            isValid: true
        };
    }

    const updatedUserInfo = await dbConnect.generateVerificationCode(payload._id);
    emailServices.sendVerificationMail(updatedUserInfo._id, updatedUserInfo.emailId, updatedUserInfo.firstName + " " + updatedUserInfo.lastName, updatedUserInfo.verificationCode);

    return {
        resType: 'REQUEST_COMPLETED',
        resMsg: 'VERIFICATION CODE SENT',
        isValid: false
    };
}

const isUserActive = async(payload) => {
    if (payload.isDeleted) {
        const updatedUserInfo = await dbConnect.reactivateUser(payload._id);
        const fullName = updatedUserInfo.firstName + " " + updatedUserInfo.lastName;
        emailServices.accountReactivatedMail(updatedUserInfo.emailId, fullName);
    }
}

const generateAccessAndRefreshTokens = async(payload) => {
    const loggedInUser = await dbConnect.generateAccessAndRefreshTokens(payload._id);
    return {
        resType: 'SUCCESS',
        resMsg: 'LOGIN SUCCESSFUL',
        data: loggedInUser,
        isValid: true
    };
}

export {
    isUserValid,
    isUserVerified,
    isUserActive,
    generateAccessAndRefreshTokens
};
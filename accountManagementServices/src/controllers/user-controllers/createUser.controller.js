"use strict";

import dbConnect from "../../db/index.js";
import emailServices from "../../email/index.js";

// Check if the user with the provided userName or emailId already exist in db or not.
const checkUserExist = async(payload) => {
    let emailId = payload.emailId;
    let userName = payload.userName;

    const response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };
    const isUserAvailable = await dbConnect.isUserAvailable(userName, emailId);

    if (isUserAvailable) {
        response.resType = 'CONFLICT';
        response.resMsg = 'User already exist with same username or emailId.';
        response.isValid = false;
    }
    return response;
};

// Create a new user and save it to database - send verification mail to user to activate it's account
const createNewUser = async(payload) => {
    const newUser = await dbConnect.createNewUser(payload);

    if (newUser) {
        const userId = newUser._id;
        const emailId = newUser.emailId;
        const fullName = newUser.firstName + " " + newUser.lastName;
        const verificationCode = newUser.verificationCode;

        emailServices.sendVerificationMail(userId, emailId, fullName, verificationCode);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'User created successfully.',
            isValid: true,
            data: newUser
        };
    }

    return {
        resType: 'INTERNAL_SERVER_ERROR',
        resMsg: 'Some error occurred while saving the record in db.',
        isValid: false
    };
};

export {
    checkUserExist,
    createNewUser
};

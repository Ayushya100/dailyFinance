"use strict";

import dbConnection from './dbConnection.js';
import {
    isUserAvailable,
    createNewUser,
    isUserByIdAvailable,
    validateNewUser,
    isUserByEmailUsernameAvailable,
    validateUserPassword,
    generateVerificationCode,
    reactivateUser,
    generateAccessAndRefreshTokens
} from './users.db.js';

export default {
    dbConnection: dbConnection,
    isUserAvailable: isUserAvailable,
    createNewUser: createNewUser,
    isUserByIdAvailable: isUserByIdAvailable,
    validateNewUser: validateNewUser,
    isUserByEmailUsernameAvailable: isUserByEmailUsernameAvailable,
    validateUserPassword: validateUserPassword,
    generateVerificationCode: generateVerificationCode,
    reactivateUser: reactivateUser,
    generateAccessAndRefreshTokens: generateAccessAndRefreshTokens
};

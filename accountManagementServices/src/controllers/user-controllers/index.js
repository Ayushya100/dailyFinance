"use strict";

import { validateNewUserPayload, validateUserLoginPayload } from "./validatePayload.controller.js";
import { checkUserExist, createNewUser } from "./createUser.controller.js";
import { checkUserById, verifyUser } from "./verifyUser.controller.js";
import { isUserValid, isUserVerified, isUserActive, generateAccessAndRefreshTokens } from "./userLogin.controller.js";
import { getUserInfoById } from "./getUserInfo.controller.js";
import { updateUserDetails } from "./updateUser.controller.js";

export default {
    validateNewUserPayload: validateNewUserPayload,
    validateUserLoginPayload: validateUserLoginPayload,
    checkUserExist: checkUserExist,
    createUser: createNewUser,
    checkUserById: checkUserById,
    verifyUser: verifyUser,
    isUserValid: isUserValid,
    isUserVerified: isUserVerified,
    isUserActive: isUserActive,
    generateAccessAndRefreshTokens: generateAccessAndRefreshTokens,
    getUserInfoById: getUserInfoById,
    updateUserDetails: updateUserDetails
};

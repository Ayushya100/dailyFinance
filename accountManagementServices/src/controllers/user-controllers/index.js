"use strict";

import { validateNewUserPayload, validateUserLoginPayload, validateChangePasswordPayload, validateNewProfileImagePayload } from "./validatePayload.controller.js";
import { checkUserExist, createNewUser } from "./createUser.controller.js";
import { checkUserById, verifyUser } from "./verifyUser.controller.js";
import { isUserValid, isUserVerified, isUserActive, generateAccessAndRefreshTokens } from "./userLogin.controller.js";
import { getUserInfoById } from "./getUserInfo.controller.js";
import { updateUserDetails } from "./updateUser.controller.js";
import { updateUserPassword } from "./updatePassword.controller.js";
import { updateProfileImage } from "./uploadProfileImage.controller.js";
import { isTokenAvailable, refreshAccessToken } from "./refreshAccessToken.controller.js";
import { deleteProfileImage } from "./deleteProfileImage.controller.js";

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
    updateUserDetails: updateUserDetails,
    validateChangePasswordPayload: validateChangePasswordPayload,
    updateUserPassword: updateUserPassword,
    validateNewProfileImagePayload: validateNewProfileImagePayload,
    updateProfileImage: updateProfileImage,
    isTokenAvailable: isTokenAvailable,
    refreshAccessToken: refreshAccessToken,
    deleteProfileImage: deleteProfileImage
};

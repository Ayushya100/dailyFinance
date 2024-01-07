"use strict";

import createUser from './createUser.route.js';
import verifyUser from './verifyUser.route.js';
import userLogin from './userLogin.route.js';
import getUserInfo from './getUserInfo.route.js';
import updateUserDetails from './updateUserDetails.route.js';
import updateUserPassword from './updateUserPassword.route.js';
import uploadProfileImage from './uploadProfileImage.route.js';

export default {
    createUserAPI: createUser,
    verifyUserAPI: verifyUser,
    userLoginAPI: userLogin,
    getUserInfoAPI: getUserInfo,
    updateUserDetailsAPI: updateUserDetails,
    updateUserPasswordAPI: updateUserPassword,
    uploadProfileImageAPI: uploadProfileImage
};

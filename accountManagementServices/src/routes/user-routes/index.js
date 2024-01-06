"use strict";

import createUser from './createUser.route.js';
import verifyUser from './verifyUser.route.js';
import userLogin from './userLogin.route.js';

export default {
    createUserAPI: createUser,
    verifyUserAPI: verifyUser,
    userLoginAPI: userLogin
};
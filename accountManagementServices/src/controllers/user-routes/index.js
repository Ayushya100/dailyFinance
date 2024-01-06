"use strict";

import { validateNewUserPayload } from "./validatePayload.controller.js";
import { checkUserExist, createNewUser } from "./createUser.controller.js";
import { checkUserById, verifyUser } from "./verifyUser.controller.js";

export default {
    validateNewUserPayload: validateNewUserPayload,
    checkUserExist: checkUserExist,
    createUser: createNewUser,
    checkUserById: checkUserById,
    verifyUser: verifyUser
};

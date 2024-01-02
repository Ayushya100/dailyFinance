import { validateNewUserPayload } from "./validatePayload.controller.js";
import { checkUserExist, createNewUser } from "./createUser.controller.js";

export default {
    validateNewUserPayload: validateNewUserPayload,
    checkUserExist: checkUserExist,
    createUser: createNewUser
};

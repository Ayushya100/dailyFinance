"use strict";

import dbConnection from './dbConnection.js';
import {
    isUserAvailable,
    createNewUser,
    isUserByIdAvailable,
    validateNewUser
} from './users.db.js';

export default {
    dbConnection: dbConnection,
    isUserAvailable: isUserAvailable,
    createNewUser: createNewUser,
    isUserByIdAvailable: isUserByIdAvailable,
    validateNewUser: validateNewUser
};

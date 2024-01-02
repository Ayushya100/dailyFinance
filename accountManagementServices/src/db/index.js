import dbConnection from "./dbConnection.js";
import { isUserAvailable, createNewUser } from "./users.db.js";

export default {
    dbConnection: dbConnection,
    isUserAvailable: isUserAvailable,
    createNewUser: createNewUser
};

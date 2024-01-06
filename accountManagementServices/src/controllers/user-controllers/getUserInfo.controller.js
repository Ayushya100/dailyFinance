"use strict";

import dbConnect from "../../db/index.js";

const getUserInfoById = async(userId) => {
    const userInfo = await dbConnect.getUserInfoById(userId);

    if (userInfo) {
        return {
            resType: 'SUCCESS',
            resMsg: 'USER FOUND',
            data: userInfo,
            isValid: true
        };
    }

    return {
        resType: 'NOT_FOUND',
        resMsg: 'USER NOT FOUND',
        data: '',
        isValid: false
    }
};

export { getUserInfoById };

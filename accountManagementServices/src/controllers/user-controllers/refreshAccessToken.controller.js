"use strict";

import jwt from "jsonwebtoken";
import dbConnect from "../../db/index.js";

const isTokenAvailable = (token) => {
    if (token) {
        return {
            resType: 'SUCCESS',
            resMsg: 'PAYLOAD VALIDATED',
            isValid: true
        };
    }

    return {
        resType: 'UNAUTHORIZED',
        resMsg: 'UNAUTHORIZED ACCESS',
        isValid: false
    };
};

const refreshAccessToken = async(token) => {
    const decodedRefreshToken = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const userId = decodedRefreshToken._id;

    const userInfo = await dbConnect.getUserInfoById(userId);

    if (userInfo) {
        const refreshedToken = await dbConnect.generateAccessAndRefreshTokens(userId);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'TOKENS HAS BEEN REFRESHED SUCCESSFULLY',
            data: refreshedToken,
            isValid: true
        };
    }

    return {
        resType: 'NOT_FOUND',
        resMsg: 'USER NOT AVAILABLE',
        isValid: false
    };
};

export {
    isTokenAvailable,
    refreshAccessToken
};

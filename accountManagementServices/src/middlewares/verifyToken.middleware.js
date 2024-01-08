"use strict";

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!accessToken) {
            return next({
                resType: 'BAD_REQUEST',
                resMsg: 'TOKEN NOT FOUND',
                isValid: false
            });
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        next();
    } catch(err) {
        next({
            resType: 'UNAUTHORIZED',
            resMsg: 'UNAUTHORIZED ACCESS - TOKEN EXPIRED',
            isValid: false
        });
    }
};

export default verifyToken;

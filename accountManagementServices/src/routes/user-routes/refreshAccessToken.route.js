"use strict";

import express from "express";
import userServices from "../../controllers/user-controllers/index.js";
import { ApiResponse } from '../../utils/ApiResponse.js';
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";
import { COOKIE_OPTIONS } from "../../constants.js";

const router = express.Router();

// API
router.post('/', async(req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        const isTokenAvailable = userServices.isTokenAvailable(refreshToken);

        if (isTokenAvailable.isValid) {
            const refreshedToken = await userServices.refreshAccessToken(refreshToken);

            if (refreshedToken.isValid) {
                res.status(responseCodes[refreshedToken.resType])
                .cookie("accessToken", refreshedToken.data.accessToken, COOKIE_OPTIONS)
                .cookie("refreshToken", refreshedToken.data.refreshToken, COOKIE_OPTIONS)
                .json(
                    new ApiResponse(responseCodes[refreshedToken.resType], {
                        userId: refreshedToken.data.userId,
                        userName: refreshedToken.data.userName,
                        accessToken: refreshedToken.data.accessToken
                    }, responseMessage[refreshedToken.resType])
                );
            } else {
                return next(refreshedToken);
            }
        } else {
            return next(isTokenAvailable);
        }
    } catch (err) {
        next({
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            isValid: false
        });
    }
});

export default router;

"use strict";

import express from "express";
import verifyToken from "../../middlewares/verifyToken.middleware.js";
import userServices from "../../controllers/user-controllers/index.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";

const router = express.Router();

// API
router.get('/:id', verifyToken, async(req, res, next) => {
    try {
        const userId = req.params.id;

        // Step 1: Validate Payload - Payload validation is not required as if any required parameter misses out then api will give 404
        // Step 2: Check if user exists or not. - If user exists then return user
        const getUserInfo = await userServices.getUserInfoById(userId);

        if (getUserInfo.isValid) {
            res.status(responseCodes[getUserInfo.resType]).json(
                new ApiResponse(responseCodes[getUserInfo.resType], getUserInfo.data, responseMessage[getUserInfo.resMsg])
            );
        } else {
            return next(getUserInfo);
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

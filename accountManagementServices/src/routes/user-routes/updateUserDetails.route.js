"use strict";

import express from "express";
import verifyToken from "../../middlewares/verifyToken.middleware.js";
import userServices from "../../controllers/user-controllers/index.js";
import { ApiResponse } from '../../utils/ApiResponse.js';
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";

const router = express.Router();

// API
router.put('/:id', verifyToken, async(req, res, next) => {
    try {
        const userId = req.params.id;
        const payload = req.body;

        // Step 1: Validate Payload - Payload validation not required. All parameters are optional.
        // Step 2: Validate if user exist or not.
        const isUserAvailable = await userServices.getUserInfoById(userId);

        if (isUserAvailable.isValid) {
            // Step 3: Update user details
            const updatedUser = await userServices.updateUserDetails(userId, payload);

            if (updatedUser.isValid) {
                res.status(responseCodes[updatedUser.resType]).json(
                    new ApiResponse(responseCodes[updatedUser.resType], updatedUser.data, responseMessage[updatedUser.resType])
                );
            } else {
                return next(updatedUser);
            }
        } else {
            return next(isUserAvailable);
        }
    } catch(err) {
        next({
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            isValid: false
        });
    }
});

export default router;

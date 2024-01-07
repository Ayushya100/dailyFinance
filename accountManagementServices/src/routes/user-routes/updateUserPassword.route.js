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

        // Step 1: Validate payload - mandatory parameters should be present.
        const isPayloadValid = userServices.validateChangePasswordPayload(payload);

        if (isPayloadValid.isValid) {
            // Step 2: Check if user exists or not.
            const isUserAvailable = await userServices.getUserInfoById(userId);

            if (isUserAvailable.isValid) {
                // Step 3: Check if new password is not same as old. If the validation is successful update the password.
                const isPasswordUpdated = await userServices.updateUserPassword(userId, payload);

                if (isPasswordUpdated.isValid) {
                    res.status(responseCodes[isPasswordUpdated.resType]).json(
                        new ApiResponse(responseCodes[isPasswordUpdated.resType], isPasswordUpdated.data, responseMessage[isPasswordUpdated.resType])
                    );
                } else {
                    return next(isPasswordUpdated);
                }
            } else {
                return next(isUserAvailable);
            }
        } else {
            return next(isPayloadValid);
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

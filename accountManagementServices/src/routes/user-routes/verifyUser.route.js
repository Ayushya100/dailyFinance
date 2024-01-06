"use strict";

import express from "express";
import { ApiResponse } from '../../utils/ApiResponse.js';
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";
import userService from "../../controllers/user-controllers/index.js";

const router = express.Router();

// API
router.get('/:id/:time/:code', async(req, res, next) => {
    try {
        const userId = req.params.id;
        const requestTime = req.params.time;
        const verificationCode = req.params.code;

        // Step 1: Validate Payload - Payload validation is not required as if any required parameter misses out then api will give 404
        // Step 2: Verify if the user with the provided userId exists or not.
        const isUserExist = await userService.checkUserById(userId);

        if (isUserExist.isValid) {
            // Step 3: Perform mandatory validations before validating the user.
            // Verification code creation time must be within 6 hours.
            // Verify if the verification code is correct or not by validating it against the saved verification code in db.
            // Step 4: If all the verification is successful then validate the user as true.
            const isUserValidated = await userService.verifyUser({userId, requestTime, verificationCode});

            if (isUserValidated.isValid) {
                res.status(responseCodes[isUserValidated.resType]).json(
                    new ApiResponse(responseCodes[isUserValidated.resType], isUserValidated.data, responseMessage[isUserValidated.resType])
                );
            } else {
                return next(isUserValidated);
            }
        } else {
            return next(isUserExist);
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

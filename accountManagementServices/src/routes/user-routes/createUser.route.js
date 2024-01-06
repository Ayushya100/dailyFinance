"use strict";

import express from "express";
import { ApiResponse } from '../../utils/ApiResponse.js';
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";
import userServices from "../../controllers/user-controllers/index.js";

const router = express.Router();

// API
router.post('/', async(req, res, next) => {
    try {
        const payload = req.body;

        // Step 1: Validate Payload - if all required fields available or not.
        const payloadValidationRes = userServices.validateNewUserPayload(payload);

        if (payloadValidationRes.isValid) {

            // Step 2: Check if User with same emailId or userName already exists or not.
            const isUserExist = await userServices.checkUserExist(payload);

            if (isUserExist.isValid) {
                // Step 3: Create User object, followed by create user dashboard and user finance objects - create entry in db.
                const isUserCreated = await userServices.createUser(payload);

                if (isUserCreated.isValid) {
                    res.status(responseCodes[isUserCreated.resType]).json(
                        new ApiResponse(responseCodes[isUserCreated.resType], isUserCreated.data, responseMessage[isUserCreated.resType])
                    );
                } else {
                    return next(isUserCreated);
                }
            } else {
                return next(isUserExist);
            }
        } else {
            return next(payloadValidationRes);
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

"use strict";

import express from "express";
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";
import userServices from "../../controllers/user-controllers/index.js";

const router = express.Router();

// API
router.post('/', async(req, res) => {
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
                        new ApiResponse(responseCodes[isUserCreated.resType], isUserCreated.data, responseMessage[isUserCreated.resMsg])
                    );
                } else {
                    res.status(responseCodes[isUserCreated.resType]).json(
                        new ApiError(responseCodes[isUserCreated.resType], responseMessage[isUserCreated.resType], isUserCreated.resType, isUserCreated.resMsg)
                    );
                }
            } else {
                res.status(responseCodes[isUserExist.resType]).json(
                    new ApiError(responseCodes[isUserExist.resType], responseMessage[isUserExist.resType], isUserExist.resType, isUserExist.resMsg)
                );
            }
        } else {
            res.status(responseCodes[payloadValidationRes.resType]).json(
                new ApiError(responseCodes[payloadValidationRes.resType], responseMessage[payloadValidationRes.resType], payloadValidationRes.resType, payloadValidationRes.resMsg)
            );
        }
    } catch(err) {
        res.status(responseCodes.INTERNAL_SERVER_ERROR).json(
            new ApiError(responseCodes.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', err)
        );
    }
});

export default router;

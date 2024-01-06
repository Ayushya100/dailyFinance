"use strict";

import express from "express";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";
import userServices from "../../controllers/user-controllers/index.js";
import { COOKIE_OPTIONS } from "../../constants.js";

const router = express.Router();

// API
router.post('/', async(req, res) => {
    try {
        const payload = req.body;

        // Step 1: Validate payload - if all required fields are available or not. - userName/emailId & password.
        const isPayloadValid = userServices.validateUserLoginPayload(payload);

        if (isPayloadValid.isValid) {
            // Step 2: Validate user if exist with the provided userName/emailId or not. - further validate password.
            const isUserValid = await userServices.isUserValid(payload);

            if (isUserValid.isValid) {
                // Step 3: Validate if the user is verified or not. If the user is not verified then send the verification link.
                const isUserVerified = await userServices.isUserVerified(isUserValid.data);

                if (isUserVerified.isValid) {
                    // Step 4: Verify if the user is active or not. If a user is a deactivated user then reactive it.
                    await userServices.isUserActive(isUserValid.data);

                    // Step 5: Generate access and refresh tokens for the user, and set the token in cookies.
                    // Update the login count and last login time.
                    const loggedInUser = await userServices.generateAccessAndRefreshTokens(isUserValid.data);

                    res.status(responseCodes[loggedInUser.resType])
                    .cookie("accessToken", loggedInUser.data.accessToken, COOKIE_OPTIONS)
                    .cookie("refreshToken", loggedInUser.data.refreshToken, COOKIE_OPTIONS)
                    .json (
                        new ApiResponse(responseCodes[loggedInUser.resType], {
                            userId: loggedInUser.data.userId,
                            username: loggedInUser.data.userName,
                            accessToken: loggedInUser.data.accessToken
                        }, responseMessage[loggedInUser.resType])
                    );
                } else {
                    res.status(responseCodes[isUserVerified.resType]).json(
                        new ApiError(responseCodes[isUserVerified.resType], responseMessage[isUserVerified.resType], isUserVerified.resType, isUserVerified.resMsg)
                    );
                }
            } else {
                res.status(responseCodes[isUserValid.resType]).json(
                    new ApiError(responseCodes[isUserValid.resType], responseMessage[isUserValid.resType], isUserValid.resType, isUserValid.resMsg)
                );
            }
        } else {
            res.status(responseCodes[isPayloadValid.resType]).json(
                new ApiError(responseCodes[isPayloadValid.resType], responseMessage[isPayloadValid.resType], isPayloadValid.resType, isPayloadValid.resMsg)
            );
        }
    } catch(err) {
        res.status(responseCodes.INTERNAL_SERVER_ERROR).json(
            new ApiError(responseCodes.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', err)
        );
    }
});

export default router;

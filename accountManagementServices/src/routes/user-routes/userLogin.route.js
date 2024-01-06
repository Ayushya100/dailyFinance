"use strict";

import express from "express";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";
import userServices from "../../controllers/user-controllers/index.js";
import { COOKIE_OPTIONS } from "../../constants.js";

const router = express.Router();

// API
router.post('/', async(req, res, next) => {
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
                    return next(isUserVerified);
                }
            } else {
                return next(isUserValid);
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

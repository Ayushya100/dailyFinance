"use strict";

import express from "express";
import verifyToken from "../../middlewares/verifyToken.middleware.js";
import userServices from "../../controllers/user-controllers/index.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";

const router = express.Router();

// API
router.delete("/:id", verifyToken, async(req, res, next) => {
    try {
        const userId = req.params.id;

        const isImageDeleted = await userServices.deleteProfileImage(userId);
        if (isImageDeleted.isValid) {
            res.status(responseCodes[isImageDeleted.resType]).json(
                new ApiResponse(responseCodes[isImageDeleted.resType], isImageDeleted.data, responseMessage[isImageDeleted.resType])
            );
        } else {
            return next(isImageDeleted);
        }
    } catch (err) {
        next({
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'SOME ERROR OCCURRED',
            isValid: false
        });
    }
});

export default router;

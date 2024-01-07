"use strict";

import express from "express";
import verifyToken from "../../middlewares/verifyToken.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import userServices from "../../controllers/user-controllers/index.js";
import { ApiResponse } from '../../utils/ApiResponse.js';
import { responseCodes, responseMessage } from "../../assets/response/response-codes.js";

const router = express.Router();

// API
router.put('/:id', verifyToken, upload.single('profileImage'), async(req, res, next) => {
    try {
        const userId = req.params.id;
        const profileImagePath = req.file?.path;

        // Step 1: Validate Payload - Check is profile image available or not.
        const isPayloadValid = userServices.validateNewProfileImagePayload(profileImagePath);

        if (isPayloadValid.isValid) {
            // Step 2: Check is user exists or not.
            // Step 3: Upload image on cloudinary and save the url in db.
            const isImageUploaded = await userServices.updateProfileImage(userId, profileImagePath);

            if (isImageUploaded.isValid) {
                res.status(responseCodes[isImageUploaded.resType]).json(
                    new ApiResponse(responseCodes[isImageUploaded.resType], isImageUploaded.data, responseMessage[isImageUploaded.resType])
                );
            } else {
                return next(isImageUploaded);
            }
        } else {
            return next(isPayloadValid);
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

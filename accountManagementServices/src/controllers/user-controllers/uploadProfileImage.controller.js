"use strict";

import dbConnect from "../../db/index.js";
import { uploadOnCloudinary, destroyOnCloudinary } from "../../utils/cloudinary.js";

const updateProfileImage = async(userId, imagePath) => {
    const userInfo = await dbConnect.getUserInfoById(userId);

    if (userInfo) {
        if (userInfo.profileImageUrl) {
            await destroyOnCloudinary(userInfo.profileImageUrl);
        }

        let cloudinaryImageURL = await uploadOnCloudinary(imagePath);
        cloudinaryImageURL = cloudinaryImageURL.data.url;

        const updatedUserInfo = await dbConnect.updateUserProfileImage(userId, cloudinaryImageURL);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'USER IMAGE UPDATED SUCCESSFULLY',
            data: updatedUserInfo,
            isValid: true
        };
    }

    return {
        resType: 'BAD_REQUEST',
        resMsg: 'USER NOT FOUND',
        isValid: false
    };
};

export { updateProfileImage };

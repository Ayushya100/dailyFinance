"use strict";

import dbConnect from "../../db/index.js";
import { destroyOnCloudinary } from "../../utils/cloudinary.js";

const deleteProfileImage = async(userId) => {
    try {
        const currentUserInfo = await dbConnect.getUserInfoById(userId);
        await destroyOnCloudinary(currentUserInfo.profileImageUrl)

        const updatedUserInfo = await dbConnect.deleteUserProfileImage(userId);
        return {
            resType: 'SUCCESS',
            resMsg: 'IMAGE DELETED SUCCESSFULLY',
            data: updatedUserInfo,
            isValid: true
        };
    } catch(err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'SOME ERROR OCCURRED WHILE SAVING THE DATA',
            isValid: false
        };
    }
};

export { deleteProfileImage };
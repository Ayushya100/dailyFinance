"use strict";

// Add User model
import User from "../models/user.model.js";
import UserFinance from "../models/userFinance.model.js";
import UserDashboard from "../models/userDashboard.model.js";

const isUserAvailable = async(userName, emailId) => {
    const isUserExist = await User.findOne({
        $or: [{ userName }, { emailId }]
    });
    return isUserExist;
};

const createNewUser = async(payload) => {
    const newUser = await User.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        emailId: payload.emailId,
        password: payload.password
    });

    await UserFinance.create({userId: newUser._id});
    await UserDashboard.create({userId: newUser._id});

    // Create a verification code for new user registered and store it in db.
    const verificationCode = newUser.generateVerificationCode();
    const updatedUserInfo = await User.findByIdAndUpdate(
        newUser._id,
        {
            $set: {
                verificationCode: verificationCode
            }
        },
        {
            new: true
        }
    ).select(
        '-password -loginCount -isDeleted -createdBy -modifiedBy'
    );

    // Return newly created user
    return updatedUserInfo;
}

export {
    isUserAvailable,
    createNewUser
};

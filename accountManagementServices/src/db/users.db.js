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

const isUserByIdAvailable = async(userId) => {
    const isUserExist = await User.findById({
        _id : userId
    }).select(
        '-password -isDeleted -createdBy -modifiedBy'
    )
    return isUserExist;
}

const isUserByEmailUsernameAvailable = async(userNameOrEmail) => {
    const isUserExist = await User.findOne({
        $or: [{userName: userNameOrEmail}, {emailId: userNameOrEmail}]
    });

    return isUserExist;
}

const generateVerificationCode = async(userId) => {
    const user = await User.findById({_id: userId});
    const verificationCode = user.generateVerificationCode();
    const updatedUserInfo = await User.findByIdAndUpdate(
        {_id: userId},
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
    return updatedUserInfo;
}

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
    const updatedUserInfo = await generateVerificationCode(newUser._id);

    // Return newly created user
    return updatedUserInfo;
}

const validateNewUser = async(userId) => {
    const updatedUserInfo = await User.findByIdAndUpdate(
        {
            _id: userId
        }, {
            $set: {
                verificationCode: '',
                isVerified: true,
                modifiedOn: Date.now(),
                modifiedBy: userId
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

const validateUserPassword = async(user, password) => {
    const isPasswordValid = user.isPasswordCorrect(password);
    return isPasswordValid;
}

const reactivateUser = async(userId) => {
    const user = await User.findByIdAndUpdate(
        {_id: userId},
        {
            $set: {
                isDeleted: false,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        '-password -loginCount -isDeleted -createdBy -modifiedBy'
    );

    return user;
}

const generateAccessAndRefreshTokens = async(userId) => {
    const user = await User.findById({_id: userId});
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    const updatedUserInfo = await User.findByIdAndUpdate(
        {_id: userId},
        {
            $set: {
                refreshToken: refreshToken,
                loginCount: user.loginCount + 1,
                lastLogin: Date.now(),
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    );

    return {accessToken, refreshToken, userId, userName: updatedUserInfo.userName};
}

const getUserInfoById = async(userId) => { 
    const userInfo = await User.findOne({
        _id: userId
    }).select(
        '-password -isVerified -isDeleted -verificationCode -refreshToken -createdBy -modifiedBy'
    );

    return userInfo;
}

const updateUserDetails = async(userId, payload) => {
    payload.modifiedOn = Date.now();
    payload.modifiedBy = userId;

    const updatedUserInfo = await User.findByIdAndUpdate(
        {_id: userId},
        {
            $set: payload
        },
        {
            new: true
        }
    ).select(
        '-password -isVerified -isDeleted -verificationCode -refreshToken -createdBy -modifiedBy'
    );
    return updatedUserInfo;
};

export {
    isUserAvailable,
    createNewUser,
    isUserByIdAvailable,
    validateNewUser,
    isUserByEmailUsernameAvailable,
    validateUserPassword,
    generateVerificationCode,
    reactivateUser,
    generateAccessAndRefreshTokens,
    getUserInfoById,
    updateUserDetails
};

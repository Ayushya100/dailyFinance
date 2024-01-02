"use strict";

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import { SALT_ROUNDS } from "../constants.js";

// Users Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    bio: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    contactNumber: {
        type: Number,
        required: false,
        length: 10,
        trim: true
    },
    profileImageUrl: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    lastLogin: {
        type: Date,
        required: false
    },
    loginCount: {
        type: Number,
        default: 0,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: false
    },
    verificationCode: {
        type: String,
        required: false
    },
    refreshToken: {
        type: String,
        required: false
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
        type: String,
        required: false,
        trim: true,
        default: "SYSTEM"
    },
    modifiedOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    modifiedBy: {
        type: String,
        required: true,
        trim: true,
        default: "SYSTEM"
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            isVerified: this.isVerified,
            isDeleted: this.isDeleted
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateVerificationCode = function() {
    return uuidv4() + this._id;
}

// Create Users Model
const User = mongoose.model('User', userSchema);

export default User;

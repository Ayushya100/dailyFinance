"use strict";

import mongoose, { Schema } from "mongoose";

// Card info Schema
const cardInfoSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        cardNumber: {
            type: Number,
            required: true
        },
        cardType: {
            type: String,
            required: true
        },
        bankInfo: {
            type: String,
            required: true
        },
        expirationDate: {
            type: Date,
            required: true
        },
        holderName: {
            type: String,
            required: true
        },
        cardColor: {
            type: String
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
        },
        isDeleted: {
            type: Boolean,
            default: false,
            required: false
        }
    }
);

// Card info Model
const CardInfoModel = mongoose.model('CardInfo', cardInfoSchema);

export default CardInfoModel;

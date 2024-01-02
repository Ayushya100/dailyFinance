"use strict";

import mongoose, { Schema } from "mongoose";

// User finance Schema
const userFinanceSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        availableFunds: {
            type: Number,
            required: true,
            default: 0
        },
        lifeTimeIncome: {
            type: Number,
            required: false,
            default: 0
        },
        lifeTimeInvestment: {
            type: Number,
            required: false,
            default: 0
        },
        lifeTimeExpenditure: {
            type: Number,
            required: false,
            default: 0
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

// User finance Model
const UserFinanceModel = mongoose.model('UserFinance', userFinanceSchema);

export default UserFinanceModel;

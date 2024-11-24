const mongoose = require("mongoose")
const travelTooltipSchema = new mongoose.Schema({
    personalDetails: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        date: {
            type: String
        },
        passport: {
            type: String
        }
    },
    familyDetails: {
        name: {
            type: String
        },
        passport: {
            type: String
        },
        DOB: {
            type: String
        }
    },
    beneficiaryDetails: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        passport: {
            type: String
        }
    },
    policyStartDate: {
        type: String
    },
    travelStrartDate: {
        type: String
    },
    discountCoupon: {
        type: String
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" },
}, {
    timestamps: true
})
module.exports = mongoose.model("TravelTooltip", travelTooltipSchema)
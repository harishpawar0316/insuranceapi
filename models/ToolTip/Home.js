const mongoose = require("mongoose")

const homeTooltipSchema = new mongoose.Schema({
    buildingValue: {
        type : String
    },
    personalDetails: {
        name: {
            type : String
        },
        email: {
            type : String
        },
        phone: {
            type : String
        },
        date: {
            type : String
        }
    },
    addressDetails: {
        flatVillaNo: {
            type : String
        },
        streetName: {
            type : String
        },
        area: {
            type : String
        },
        pOBox: {
            type : String
        },
        makani: {
            type : String
        }
    },
    policyStartDate: {
        type : String
    },
    discountCoupon: {
        type : String
    },
    contentValue: {
        type: String
    },
    personalbelongingValue: {
        type: String
    },
    buildingName: {
        type: String
    },
    createdBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
    updatedBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
}, {
    timestamps : true
})

module.exports = mongoose.model("HomeTooltip", homeTooltipSchema)
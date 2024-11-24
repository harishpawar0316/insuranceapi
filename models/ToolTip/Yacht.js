const mongoose = require("mongoose")

const yachtTooltipSchema = new mongoose.Schema({
    boatDetails: {
        yachtName: {
            type : String
        },
        regNo: {
            type : String
        },
        hullSerialNumber: {
            type : String
        },
        lengthOfBoat: {
            type : String
        },
        numberOfPassengers: {
            type : String
        },
        placeOfMooring: {
            type : String
        }
    },
    yachtMaker: {
        type : String
    },
    engineDetails: {
        engineSerialNo: {
            type : String
        },
        horsePower: {
            type : String
        },
        speedInKnots: {
            type : String
        }
    },
    sumInsured: {
        hullEquipmentValue: {
            type : String
        },
        dinghyTenderValue: {
            type : String
        },
        outboardValue: {
            type : String
        },
        personalBelongingCash: {
            type : String
        },
        trailerValue: {
            type : String
        }
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
    policyStartDate: {
        type : String
    },
    discountCoupon: {
        type : String
    },
    createdBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
    updatedBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
}, {
    timestamps : true
})

module.exports = mongoose.model("YachtTooltip", yachtTooltipSchema)
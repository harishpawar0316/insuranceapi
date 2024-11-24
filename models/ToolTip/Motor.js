const mongoose = require("mongoose")

const motorTooltipSchema = new mongoose.Schema({
    chassisNumber: {
        type : String
    },
    valueOfVehicle: {
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
    policyStartDate: {
        type : String
    },
    discountCoupon: {
        type : String
    },
    insuredName: {
        type : String
    },
    insuredDetails: {
        name: {
            type : String
        },
        nationality: {
            type : String
        },
        driverDateOfBirth: {
            type : String
        },
        mobileNumber: {
            type : String
        },
        email: {
            type : String
        },
        modelYear: {
            type : String
        },
        make: {
            type : String
        },
        model: {
            type : String
        },
        dateOfFirstRegistration: {
            type : String
        },
        bodyType: {
            type : String
        },
        numberOfCylinders: {
            type : String
        },
        sumInsured: {
            type : String
        },
        currentlyUninsuredBreakInInsurance: {
            type : String
        },
        thirdPartyLastYear: {
            type : String
        },
        modifiedNonGCCSpec: {
            type : String
        },
        profession: {
            type : String
        },
        TCFNo: {
            type : String
        },
        drivingDetails: {
            licenseNumber: {
                type : String
            },
            licenseIssueDate: {
                type : String
            },
            licenseExpiryDate: {
                type : String
            },
            licenseIssuingEmirate: {
                type : String
            }
        },
        chassisNumber: {
            type : String
        },
        engineNumber: {
            type : String
        },
        registrationNumber: {
            type : String
        },
        plateCategory: {
            type : String
        },
        policyIssueDate: {
            type : String
        },
        countryOfManufacturing: {
            type : String
        },
        vehicleColor: {
            type : String
        },
        emiratesIDNumber: {
            type : String
        },
        gender: {
            type : String
        }
    },
    createdBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
    updatedBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
}, {
    timestamps : true
})

module.exports = mongoose.model("MotorTooltip", motorTooltipSchema)
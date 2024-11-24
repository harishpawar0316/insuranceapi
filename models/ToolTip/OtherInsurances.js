const mongoose = require('mongoose')

const otherInsurance = new mongoose.Schema({
    otherInsuranceOption: {
        type:String
    },
    name: {
        type:String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    briefInformation: {
        type: String
    },
    day: {
        type: String
    },
    time: {
        type: String
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" },
}, {
    timestamps:true
})
module.exports = mongoose.model('otherInsurancesToolTips',otherInsurance)
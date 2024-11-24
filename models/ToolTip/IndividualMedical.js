const mongoose = require("mongoose")

const individualMedicalTooltipSchema = new mongoose.Schema({
    insuredDetails: {
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
        },
        passportNumber: {
            type: String
        },
        passportIssueDate:{
            type: String
        },
        passportExpiryDate:{
            type: String
        },
        visaFileNumber:{
            type: String
        },
        visaIssueDate:{
            type: String
        },
        visaExpiryDate:{
            type: String
        },
        emiratesIdNumber:{
            type: String
        },
        emiratesIssueDate:{
            type: String
        },
        emiratesExpiryDate:{
            type: String
        },
    },
    sponsorDetials: {
        tradeLicenseNumber:{
            type: String
        },
        tradeLicenseExpiryDate:{
            type: String
        },
        taxRegistrationNumber:{
            type: String
        },
        establishmentCardNumber:{
            type: String
        },
        establishmentCardExpiryDate:{
            type: String
        },
        sponsorVisa: {
            type: String
        },  
    },
    height: {
        type : String
    },
    weight: {
        type : String
    },
    PolicyStartDate: {
        type : String
    },
    DiscountCoupon: {
        type : String
    },
    createdBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
    updatedBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
}, {
    timestamps : true
})

module.exports = mongoose.model("IndividualMedicalTooltip", individualMedicalTooltipSchema)
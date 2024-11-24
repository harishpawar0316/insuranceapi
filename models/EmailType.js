const mongoose = require("mongoose")

const emailTypeSchema = new mongoose.Schema({
    name : {
        type : String
    },
    createdBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
    updatedBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
}, {
    timestamps : true
})

module.exports = mongoose.model("EmailType", emailTypeSchema)
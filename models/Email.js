const mongoose = require("mongoose")

const emailSchema = new mongoose.Schema({
    subject : { type : String },
    body: { type : String },
    sent_by : { type : String },
    received_by : [{ type : mongoose.Schema.Types.ObjectId, ref : "Admins" }],
    // received_by: [{ type: String }],
    attachments : [{ type : Object }],
    cc : [{ type : mongoose.Schema.Types.ObjectId, ref : "Admins" }],
    bcc : [{ type : mongoose.Schema.Types.ObjectId, ref : "Admins" }],
    // cc: { type: Array },
    // bcc: { type: Array },
    createdAt : { type : Date },
    createdBy : { type : mongoose.Schema.Types.ObjectId, ref : "Admins" },
    LOB : { type : mongoose.Schema.Types.ObjectId, ref : "Line_of_business" },
    business_type: { type: String },
    // enum: ["New", "Renewal"]
    plan_type : { type : mongoose.Schema.Types.ObjectId, ref : "policy_type" },
    template_id : { type : mongoose.Schema.Types.ObjectId, ref : "EmailTemplate" },
    network : { type : String }
}, {
    timestamps : true
})

module.exports = mongoose.model("Email", emailSchema)
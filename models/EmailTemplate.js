const mongoose = require("mongoose")

const emailTemplateSchema = new mongoose.Schema({
    subject: { type: String },
    body: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "Admins" },
    createdAt: { type: Date },
    LOB: { type: mongoose.Schema.Types.ObjectId, ref: "Line_of_business" },
    business_type: { type: String },
    plan_type: { type: mongoose.Schema.Types.ObjectId, ref: "policy_type" },
    email_type: { type: mongoose.Schema.Types.ObjectId, ref: "EmailType" }
}, {
    timestamps: true
})

module.exports = mongoose.model("EmailTemplate", emailTemplateSchema)
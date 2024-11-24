const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "admins" },
    lead: [{ type: mongoose.Types.ObjectId, ref: "new_leads" }],
    count : { type : Number },
    role: { type: String, enum: ["SA", "DC", "PI"] }
});

const specialIncentiveModel = new mongoose.Schema({
    locations: [{ type: mongoose.Types.ObjectId, ref: "locations" }],
    lobs: [{ type: mongoose.Types.ObjectId, ref: "line_of_businesses" }],
    roles: [{ type: mongoose.Types.ObjectId, ref: "usertypes" }],
    users: [{ type: mongoose.Types.ObjectId, ref: "admins" }],
    start_time: { type: Date },
    end_time: { type: Date }, 
    policy_type : { type : String, enum : ["Close", "Amount"]}, 
    policies_amount: { type: Number },
    incentive_type: { type: String, enum: ["Value", "Percentage"] },
    incentive_amount: { type: Number },
    description: { type: String },
    completed_by: [participantSchema],
    participants: [participantSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("SpecialIncentive", specialIncentiveModel);
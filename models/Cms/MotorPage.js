const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MotorpageSchema = new Schema({
    motorContent: { type: String },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);
module.exports = mongoose.model("motorpagecms", MotorpageSchema);

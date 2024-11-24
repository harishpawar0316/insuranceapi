const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtherpageSchema = new Schema({
    OtherContent: { type: String },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);
module.exports = mongoose.model("otherinsurancepagecms", OtherpageSchema);

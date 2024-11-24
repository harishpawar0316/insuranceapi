const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YachtpageSchema = new Schema({
    yachtContent: { type: String },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);
module.exports = mongoose.model("yachtpagecms", YachtpageSchema);

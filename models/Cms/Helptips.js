const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HelptipsSchema = new Schema({
    helptipQuestion: { type: String },
    helptipContent: { type: String },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);
module.exports = mongoose.model("helptipcms", HelptipsSchema);
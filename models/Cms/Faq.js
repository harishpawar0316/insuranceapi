const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
    faqQuestion: { type: String },
    faqContent: { type: String },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);
module.exports = mongoose.model("faqcms", FaqSchema);
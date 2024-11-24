const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MainpageSchema = new Schema({
    banner: { type: Array },
    insurance_detail_banner: { type: Array },
    know_more_header: { type: String },
    know_more_banner: { type: Array },
    know_more_content: { type: String },
    howToReachUs: { type: String },
    status: { type: Number, default: 1 },
    },
    { timestamps: true }
);
module.exports = mongoose.model("mainpagecms", MainpageSchema);
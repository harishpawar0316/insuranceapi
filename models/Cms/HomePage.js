const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomepageSchema = new Schema({
    homeContent: { type: String },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);
module.exports = mongoose.model("homepagecms", HomepageSchema);

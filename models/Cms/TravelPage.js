const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TravelpageSchema = new Schema({
    travelContent: { type: String },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);
module.exports = mongoose.model("travelpagecms", TravelpageSchema);

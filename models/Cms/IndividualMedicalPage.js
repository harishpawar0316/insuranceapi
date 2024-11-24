const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalpageSchema = new Schema({
    individual_medical_Content: { type: String },
    status: { type: Number, default: 1 },
},
    { timestamps: true }
);
module.exports = mongoose.model("Individualmedicalpagecms", MedicalpageSchema);

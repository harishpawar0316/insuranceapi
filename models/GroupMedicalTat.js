const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupMedicalTatSchema = new Schema({
 tatdays: { type: String },
 location: { type: Array },
 claimtype: { type: String },
 status: { type: Number, default: 1 },  
},
 { timestamps: true }
)

module.exports = mongoose.model("groupMedicalTatday", GroupMedicalTatSchema);
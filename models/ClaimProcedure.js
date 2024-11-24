const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClaimProcedureSchema = new Schema({
    // procedure_name: { type: String },
    // procedure_code: { type: String },
    procedure_description: { type: String },
    heading: { type: String },
    link: { type: String },
    insurance_company: { type: Schema.Types.ObjectId, ref:'companies'},
    file: { type: String },
    status: { type: Number, default: 1 }
},{
    timestamps: true
});
module.exports = mongoose.model('claim_procedure', ClaimProcedureSchema);
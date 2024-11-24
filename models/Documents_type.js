const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DocumentSchema = new Schema({
    document_type: { type: String },
    document_lob: { type: Array },
    document_location: { type: Array },
    policy_type: { type: Array },
    vehicle_brand_new : { type: Array },
    is_current_year_policy_still_valid : { type: Array },
    mortgage: { type: Array },
    vehicle_specification: { type: Array },
    number_of_years_of_no_claim: { type: Array },
    status: { type: Number, default: 1 },
    visaType: { type: Array },
    medicalId: { type: Object },
    medicaliSueDate: { type: Object },
    medicalExpiryDate: { type: Object },
    documentExpiryDate: { type: Date },
    insurrerFor: { type: Boolean },
    group_medical_document_type: { type: String },
    group_medical_document_category : {type:Array},
    document_timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Document', DocumentSchema);
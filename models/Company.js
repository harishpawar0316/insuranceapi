const mongoose = require('mongoose');
const { Schema } = mongoose;
const CompanySchema = new Schema({
    company_name: { type: String },
    company_body: { type: String },
    company_email_id: { type: String },
    company_phone_no: { type: String },
    company_address: { type: String },
    company_location: { type: String },
    company_line_of_business_id: { type: String },
    company_logo: { type: Array },
    company_dha_format: { type: Array },
    company_medical_application: { type: Array },
    company_salary_declaration: { type: Array },
    company_kyc_form: { type: Array },
    company_status: { type: Number, default: 1 },
    company_timestamp: { type: Date, default: Date.now },
    company_terms_conditions:{
        type: Array,
    },
    blackListVehicle:{type:Array},
    blackListYatch: { type: Array },
    default_time:{type:String}

});

module.exports = mongoose.model('Company', CompanySchema)
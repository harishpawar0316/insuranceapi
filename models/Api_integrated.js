const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const apiSchema = new Schema({
    company_id : { type: Schema.Types.ObjectId, ref: 'companies' },
    line_of_business_id : { type: Schema.Types.ObjectId, ref: 'line_of_businesses' },
    api_integrate : { type: Number, default: 1 },
    credit_limit : { type: Number, default: 0 },
    api_status : { type: Number, default: 1 },
    timestamp : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Api_integrated', apiSchema)
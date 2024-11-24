const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Year_CodeSchema = new Schema({
    qic_Code: { type: Number },
    jdv_Code: { type: Number },
    yearDesc: { type: Number },
    location: { type: Array },
    status: { type: Number, default: 1 },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Year_Code', Year_CodeSchema)
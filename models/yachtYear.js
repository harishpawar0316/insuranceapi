const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const yachtYearSchema = new Schema({
    yearDesc: { type: Number },
    location: { type: Array },
    status: { type: Boolean, default: true },
},
{
    timestamps:true
}
);
module.exports = mongoose.model('yatchYear', yachtYearSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const medicalQoutesPageSchema = new Schema({
    name: { type: String },
    status: { type: Boolean, default: true },
},{
    timestamps:true,
}
);
module.exports = mongoose.model('medicalQoutesPage', medicalQoutesPageSchema);
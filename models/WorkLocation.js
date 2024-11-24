const mongoose = require('mongoose')
const Schema = mongoose.Schema
const WorkLocationSchema = new Schema({
    worklocation: { type: String },
    location: { type: Array },
    status: { type: Number, default: 1 }
}, {
    timestamps: true
})
module.exports = mongoose.model('Work_Location', WorkLocationSchema)
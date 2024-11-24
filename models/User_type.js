const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserTypeSchema = new Schema({
    usertype: { type: String },
    usertype_status: { type: Number, default: 1 },
    usertype_timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('usertype', UserTypeSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Yacht_Questions= new Schema({
    name: { type: String },
    status: { type: Boolean, default: true },
    claim_experience: { type: Boolean, default: false },
    location: { type: Array },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('yacht_Questions', Yacht_Questions)
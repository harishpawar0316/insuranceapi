const mongoose = require('mongoose');
const { Schema } = mongoose;
const testimonialsSchema = new Schema({
    name: { type: String },
    designation: { type: String },
    description: { type: String },
    rating: { type: String },
    image: { type: Array},
    status: { type: Boolean ,default:true },
},
{ timestamps: true }
);
module.exports = mongoose.model('testimonials', testimonialsSchema)
const mongoose = require('mongoose');
const { Schema } = mongoose;
const yachtModelSchema = new Schema({
    name: { type: String },
    MakeId: { type : Schema.Types.ObjectId, ref: 'yachtmakes' },
    start_year: { type: Number },
    bodyTypeId: { type : Schema.Types.ObjectId, ref: 'yatch_body_type_lists' },
    engine: { type: Number },
    minValue: { type: Number },
    maxValue: { type: Number },
    Mindep: { type: Number },
    maxDep: { type: Number },
    noOfDep: { type: Number },
    location: { type: Array },
    status: { type: Boolean, default: true },
},
{
    timestamps:true
}
);
module.exports = mongoose.model('YachtModel', yachtModelSchema)
const { Schema } = require('mongoose');

const mongoose = require('mongoose')

const termsConstionsSchema = new Schema(
    {
        lob: { type : Schema.Types.ObjectId, ref: 'line_of_businesses' },
        terms_constions: { type: String, required: true },
        status:{
            type:Boolean,default:true
        }
    },
        {
            timestamps: true
        }
)

module.exports.termsConditionsModels = mongoose.model('terms_conditions', termsConstionsSchema);
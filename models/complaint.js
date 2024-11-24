const { Schema } = require('mongoose');
const mongoose = require('mongoose')
const complaintSchema = new Schema(
    {
        phone_number:{
            type:String
        },
        whatsApp_number:{
            type:String
        },
        email:{
            type:String
        },
        name:{
            type:String
        },
        query: { type: String, required: true },
        status:{
            type:Boolean,default:true
        },
        updated_by: { type: Schema.Types.ObjectId, ref: 'admins' },
        complaint_status: { type: String, enum: ["In Progress", "Partially Resolved", "Resolved","Pending"], default: "Pending" }
    },
        {
            timestamps: true
        }
)

module.exports.ComplaintModels = mongoose.model('complaint', complaintSchema);
const { Schema } = require('mongoose');
const mongoose = require('mongoose')
const customerComplaintSchema = new Schema(
    {
        phone_number:{
            type:String
        },
        email:{
            type:String
        },
        name:{
            type:String
        },
        message: { type: String, required: true },
        lob:{ type: Array },
        status:{
            type:Boolean,default:true
        },
        category:{
            type:String
        },
        updated_by: { type: Schema.Types.ObjectId, ref: 'admins' },
        complaint_status: { type: String, enum: ["In Progress", "Partially Resolved", "Resolved", "Pending"], default: "Pending" }
        
    },
        {
            timestamps: true
        }
)

module.exports.customerComplaintModels = mongoose.model('customer_complaint', customerComplaintSchema);
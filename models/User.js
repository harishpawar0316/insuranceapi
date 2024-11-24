const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        // required: true
    },
    age:Number,
    image:String,

    createdAt: { type : Date, default : Date.now}
});

module.exports= mongoose.model('empdata',UserSchema)
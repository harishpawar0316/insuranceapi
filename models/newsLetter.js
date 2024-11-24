const mongoose = require('mongoose');
const { Schema } = mongoose;
const newsLetterSchema = new Schema({
    email: {type : String},
    status: {type: Boolean, default: true},

},{
    timestamps:true,
}
);
module.exports= mongoose.model('news_letter',newsLetterSchema)
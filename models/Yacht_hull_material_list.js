const mongoose = require('mongoose');
const { Schema } = mongoose;
const Yacht_hull_material_listSchema = new Schema({
    yacht_hull_material:{type : String},
    yacht_hull_material_location:{type : Array},
    yacht_hull_material_status:{type : Number,default:1},
    yacht_hull_material_timestamp: { type : Date, default : Date.now}
});

module.exports= mongoose.model('yacht_hull_material_list',Yacht_hull_material_listSchema)
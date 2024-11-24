const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Module_Schema = new Schema({
    module_name: { type: String},
    sub_module: {type:Array},
});

module.exports.Module = mongoose.model("Module", Module_Schema);
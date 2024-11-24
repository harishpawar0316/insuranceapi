const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Plan_for_gcc_specSchema = new Schema({
    plan_for_gcc_spec_name: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('Plan_for_gcc_spec', Plan_for_gcc_specSchema);
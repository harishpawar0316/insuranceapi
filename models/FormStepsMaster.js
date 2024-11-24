const moongose = require('mongoose');
const Schema = moongose.Schema;

const FormStepSchema = new Schema({
    lob: { type:Array },
    form_type: { type: String },
    step_no : { type: String },
    message : { type: String },
    description : { type: String },
    logo : { type: Array },
    status: { type: Boolean, default: true },
});

module.exports = moongose.model('form_steps_master', FormStepSchema); 
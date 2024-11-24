const moongose = require('mongoose');
const Schema = moongose.Schema;
const plan_forSchema = new Schema({
    plan_for_name: {
        type: String,
        required: true,
    }
});
module.exports = moongose.model('Plan_for', plan_forSchema);
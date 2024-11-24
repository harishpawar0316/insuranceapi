const mongoose = require('mongoose');

const ObjectId = async (id) => mongoose.Types.ObjectId(id);
module.exports = {ObjectId};
const rule = require('../schema/p_brand');
const mongoose = require('mongoose');
const schema = new mongoose.Schema(rule,{collection: 'p_brand'});
module.exports = mongoose.model('p_brand',schema);
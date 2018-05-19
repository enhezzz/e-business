const mongoose = require('mongoose');
const rule = require('../schema/product');
const schema = new mongoose.Schema(rule,{collection:'product'});
module.exports = mongoose.model('product',schema);

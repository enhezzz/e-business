const mongoose = require('mongoose');
const rule = require('../schema/cart');
const schema = new mongoose.Schema(rule);
module.exports = mongoose.model('cart',schema);
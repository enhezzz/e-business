const rule = require('../schema/p_style');
const mongoose = require('mongoose');
const schema = new mongoose.Schema(rule,{collection: 'p_style'});
module.exports = mongoose.model('p_style',schema);
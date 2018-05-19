const mongoose = require('mongoose');
const rule = require('../schema/register');
const schema = new mongoose.Schema(rule,{collection: 'account'});
module.exports = mongoose.model('account',schema);
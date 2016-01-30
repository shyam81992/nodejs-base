var mongoose = require('mongoose');
var mysql = require('mysql');
var cmsSchema = mongoose.Schema({});
module.exports.cms = mongoose.model('cms', cmsSchema);

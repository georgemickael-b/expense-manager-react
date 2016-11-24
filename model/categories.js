var mongoose = require('mongoose');
var CategoriesModel = require('../model/categories')

var schema = new mongoose.Schema({
  name : {type : String,unique: true }
});

module.exports = mongoose.model('Categories', schema,'categories');

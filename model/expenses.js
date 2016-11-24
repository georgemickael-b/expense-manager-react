var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  title : String,
  amount : Number,
  notes : String,
  categoriesID  : Array
});

module.exports = mongoose.model('Expenses', schema,'expenses');

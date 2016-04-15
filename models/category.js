var mongoose = require('mongoose')
var Schema = mongoose.Schema


var categorySchema = {
  _id: {
    type: String
  },
  parent: {
    type: String,
    ref: 'Category'
  },
  ancestors:[{
    type: String,
    ref: 'Category'
  }]

}

var category = mongoose.model('Category', categorySchema)
module.exports = category
module.exports.categorySchema = categorySchema;

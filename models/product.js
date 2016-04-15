var mongoose = require('mongoose')
var Category = require('./category')
var Schema = mongoose.Schema

var productSchema = {
  name:{
    type: String,
    required: true,
    unique: true
  },
  pictures:[{
    type: String,
    match:/^http:\/\//i
  }],
  amount: {
    type: Number,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  _category: {
    type : Category.categorySchema
  }
}
// Schema.index({ name: 'text' });
var product = mongoose.model('Product', productSchema)


module.exports = product

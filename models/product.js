var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')
var Category = require('./category')
var Schema = mongoose.Schema

var productSchema = new Schema({
  pid:{
    type:Number
  },
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
})
// Schema.index({ name: 'text' });
var product = mongoose.model('Product', productSchema)
productSchema.plugin(autoIncrement,{inc_field: 'pid'})

module.exports = product

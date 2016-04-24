var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')
var Schema = mongoose.Schema

var orderSchema = new Schema({
  _id:{
    type:Number
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true,
  },
  total_amount:{
    type: Number,
    required: true
  },
  date:{
    type:Date,
    default: Date.now
  },
  data : {
    products:[{
      name: {
        type:String
      },
      quantity:{
        type:Number,
        default : 0,
        //required: true
      },
      price:{
        type:Number,
        //required:true
      }
    }]
  }
})

var order = mongoose.model('Order', orderSchema)
orderSchema.plugin(autoIncrement)
module.exports = order

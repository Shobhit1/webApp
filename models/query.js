var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')
var Schema = mongoose.Schema

var querySchema = new Schema({
  qid:{
    type:Number
  },
  first_name:{
    type:String
  },
  last_name:{
    type:String
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true,
  },
  statement:{
    type:String
  }
})

var quer = mongoose.model('Query', querySchema)
querySchema.plugin(autoIncrement,{inc_field: 'qid'})
module.exports = quer

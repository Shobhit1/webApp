var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  first_name: {
    type: String,
    required : true
  },
  last_name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true,
    unique: true
  },
  admin: {
    type: Boolean
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false
  },
  password:{
    type: String
  }
})

var user = mongoose.model('User', userSchema)

module.exports = user

const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    phonenumber: Number,
  })
  
  
  const Person = mongoose.model('Person',personSchema)

  module.exports = Person
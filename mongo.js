const mongoose = require('mongoose')
const conf = require('./Utils/config')
//const password = process.argv[2]

//const url = `mongodb+srv://danieldaniel98717:${password}@cluster0.xg6myi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = conf.MONGODB_URI
mongoose.set('strictQuery',false)

mongoose.connect(url)


console.log(process.argv[2])
/*if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}*/

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    required: true
  },
  phonenumber: Number,
})


const Person = mongoose.model('Person',personSchema)

module.exports = Person

// console.log(process.argv.length)
// if(process.argv.length==5){
//   const person = new Person({
//     name: process.argv[3],
//     phonenumber: process.argv[4],
//   }) 

//   person.save().then(result => {
//     console.log('person saved!')
//     mongoose.connection.close()
//   })

// }


// if(process.argv.length==3){
//   Person.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
//   })
//  }
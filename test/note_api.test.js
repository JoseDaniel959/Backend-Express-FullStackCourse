const {test,after,beforeEach} = require("node:test")
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index.js')
const persons = require('../mongo.js')
const assert = require('node:assert')

const api = supertest(app)



const initialPeople = [
    {
      name: 'Hitana',
      phonenumber: false,
    },
    {
        name: 'Bowser can execute only JavaScript',
        phonenumber: 123321,
    },
    {
      name: 'Jose Daniel Bustamante Arango',
      phonenumber: 101010232,
    },
  ]

beforeEach(async () => {
  await persons.deleteMany({})
  let personObject = new persons(initialPeople[0])
  await personObject.save()
  personObject = new persons(initialPeople[1])
  await personObject.save()
})

const peopleInDb = async () => {
  const notes = await persons.find({})
  return notes.map(person => person.toJSON())
}


test('HTTP request to /api/notes has 2 of length', async () => {
    const response = await api.get("/api/persons")
    assert.strictEqual(response.body.length, 2)
})

test('_id is a property in the body in the post method', async () =>{
  const response = await api.post("/api/persons").send(initialPeople[2])
  assert(response.text.search("_id") !== -1)
  

})

test("HTTP post request to api/persons creates sucessfully a new person in the database", async () =>{
  const responseFirstGet = await api.get("/api/persons")
  const responsePost = await api.post("/api/persons").send(initialPeople[2])
  const responseSecondGet = await api.get("/api/persons")
  //console.log(responseFirstGet.body.length + 1)
  //console.log(responseSecondGet.body.length )
  assert(responseFirstGet.body.length+1 == responseSecondGet.body.length )
})

test("HTTP Delete request to api/persons deletes sucessfully the choosen id", async () =>{
  const personsAtBeginning = await peopleInDb()
  const noteToDelete = personsAtBeginning[0]
  await api.delete(`/api/persons/${noteToDelete._id}`).expect(204)
  const personsAtEnd = await peopleInDb()
  assert.strictEqual(personsAtBeginning.length -1, personsAtEnd.length)
})

after(async () => {
    await mongoose.connection.close()
  })
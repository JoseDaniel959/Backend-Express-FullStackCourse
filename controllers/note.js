const personRouter = require("express").Router()
const persons = require('../mongo.js')

personRouter.get('/', async (req, res) => {
    const response = await persons.find({})
    res.send(response)

    
})

personRouter.get('/:id', async (req, res,next) => {
  const id = req.params.id
  const searchedPerson =  await persons.find({_id:id})
  res.send(searchedPerson)
  /*if(searchedPerson== undefined){
      res.status(404).end()
  }
  else{
      res.send(persons.filter( person => id==person.id))
  }*/
  
})

personRouter.get('/info', (req, res) => {
  res.send("PhoneBook has info for" + persons.length + '<br>' + new Date())
})

personRouter.delete('/:id', async (req, res,next) => {
const id = req.params.id
//const deletePerson = persons.filter( person => id!=person.id)
//console.log(typeof(id))
const response = await persons.findByIdAndDelete(id)//.then( result =>  res.status(204).end())
res.status(204).end()
/*if(deletePerson== undefined){
    res.status(404).end()
}
else{
  persons = deletePerson
  res.send(deletePerson)
}*/
})

personRouter.post('/', async (req, res) => {

const new_person = new persons({name:req.body.name, phonenumber:req.body.number})
const response = await persons.create(new_person)//.then(createdPerson =>{ console.log("person created")}).catch(error =>{console.log("error.response.data.error")})
res.send(response)

//new_person.save()
/*if(req.body.number != undefined){
  if(req.body.name != undefined){
    //console.log(new_person.number)  
    const unique_name = persons.find({name:req.body.name }).then(person => console.log(person))
    console.log("entrooo ",unique_name)  
    if(unique_name == undefined){
        new_person.save()
        res.send("new person created")
      }
      else{
        res.send({ error: 'name must be unique' })
      }
      

  }
  else{
    res.send(res.send({ error: 'name can´t be undefined' }))
  }
}
else{
  res.send(res.send({ error: 'number   can´t be undefined' }))
}
*/
//response.json(new_person)
//res.send("new person added to the database")


})

module.exports = personRouter
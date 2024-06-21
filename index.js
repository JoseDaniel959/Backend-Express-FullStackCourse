const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const searchedPerson = persons.find( person => id==person.id)
    if(searchedPerson== undefined){
        res.status(404).end()
    }
    else{
        res.send(persons.filter( person => id==person.id))
    }
    
  })

app.get('/info', (req, res) => {
    res.send("PhoneBook has info for" + persons.length + '<br>' + new Date())
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const deletePerson = persons.filter( person => id!=person.id)
  
  if(deletePerson== undefined){
      res.status(404).end()
  }
  else{
    persons = deletePerson
    res.send(deletePerson)
  }
})
app.use(express.json())
app.post('/api/persons', (req, res) => {
  const new_person = req.body
  
  if(new_person.number != undefined){
    if(new_person.name != undefined){
      console.log(new_person.number)  
      const unique_name = persons.find(person => person.name == new_person.name)
        if(unique_name == undefined){
          persons = [...persons , new_person]
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
  //response.json(new_person)
  res.send(new_person)
  

})


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
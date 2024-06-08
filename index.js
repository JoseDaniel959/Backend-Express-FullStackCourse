const express = require('express')
const app = express()
const port = 3000

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

app.get('/info', (req, res) => {
    res.send("PhoneBook has info for" + persons.length + '<br>' + new Date())
})




app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
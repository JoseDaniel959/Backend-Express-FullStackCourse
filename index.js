const express = require('express')
const app = express()
const config = require("./Utils/config.js")
const logger = require("./Utils/logger.js")
const personRouter = require("./controllers/note.js")

app.use(express.json())

app.use("/api/persons",personRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

//const port = process.env.PORT || 3000
const cors = require('cors')


app.use(cors())
app.use(express.static('build'))
// persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]





const errorHandler = (error, request, response, next) => {
  //console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

module.exports = app

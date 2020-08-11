require('dotenv').config();
const express = require('express')
const { request } = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors')
const Person = require('./models/person')


//Adding it to format. 
app.use(express.static('build'))
app.use(express.json())
app.use(cors())


//Creating token for body
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));



app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
    console.log(persons)
  })
})


app.get('/info', (req,res)=>{
  let date = new Date(new Date().toUTCString())
  date = JSON.stringify(date)
  res.write(date)
  res.write(`\nPhonebook has info for ${persons.length} people`)
  res.end()
})

app.get('/api/persons/:id', (request, response, next)=> {
  Person.findById(request.params.id)
    .then(note => {
      if(note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body) 

   if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'something missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
    console.log("This is new person " + savedPerson);
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
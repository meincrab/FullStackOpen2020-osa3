require('dotenv').config();
const express = require('express')
const { request } = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors')
const Person = require('./models/person')



//Creating token for body
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
//Adding it to format. 
app.use(cors())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(express.json())
app.use(express.static('build'))



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

app.get('/api/persons/:id', (request, response)=> {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
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
    persons = [
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "Just Name",
        "number": "22-22-1111115",
        "id": 5
      },
      {
        "name": "To Delete",
        "number": "11-22-333333",
        "id": 6
      },
      {
        "name": "To Update",
        "number": "11-11-111111",
        "id": 7
      }
    ]
    response.json(persons)
    console.log("This is new person " + savedPerson);
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
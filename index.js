const express = require('express')
const { request } = require('express')
const app = express()
app.use(express.json())



let persons = [
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 1
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 2
          },
          {
            "name": "Just Name",
            "number": "22-22-1111115",
            "id": 3
          },
          {
            "name": "To Delete",
            "number": "11-22-333333",
            "id": 4
          },
          {
            "name": "To Update",
            "number": "11-11-111111",
            "id": 5
          }
        ]


app.get('/api/persons', (req, res) => {
  res.send(persons)
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
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if(persons.some(person => person.name === body.name)){
    return response.status(409).json({
      error: 'already exists, name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random() * 100000)
  }

  persons = persons.concat(person)

  response.json(persons)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
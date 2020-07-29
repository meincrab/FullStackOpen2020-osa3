const http = require('http')

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
const app = http.createServer((request, response) => 
{  response.writeHead(200, { 'Content-Type': 'application/json' }) 
response.end(JSON.stringify(persons))
})


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
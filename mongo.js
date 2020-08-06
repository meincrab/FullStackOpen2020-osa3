const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://meincrab:${password}@cluster0.ixbr2.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Dan Abramov',
  number: 12-43-234345,
  id: 1,
})

person.save().then(response => {
  console.log('person saved!')
  mongoose.connection.close()
})
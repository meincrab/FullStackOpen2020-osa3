const mongoose = require('mongoose')



if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}


const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {   
   console.log('connected to MongoDB')  
  })
.catch((error) => {
   console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)




/* if (process.argv[3] != null) {

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

person.save().then(response => {
  console.log('person saved!')
  mongoose.connection.close()
})
}
else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name + " " + person.number) 
    })
    mongoose.connection.close()
  }) 
}*/
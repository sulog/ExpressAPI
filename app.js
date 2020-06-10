var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')


var app = express()

console.log(process.env.ENV)

if (process.env.ENV === 'Test') {
  console.log('Using Test')
  var db = mongoose.connect('mongodb://localhost:27017/booksAPI_Test')
}
else {
  console.log('Using Real')
  var db = mongoose.connect('mongodb://localhost:27017/booksAPI')
}

var port = process.env.port || 3000
var Book = require('./models/bookModel')
var bookRouter = require('./routes/bookRouter')(Book)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', bookRouter)

app.get('/', (req, res) => {
  res.send('Welcome to to first nodemon API')
})

app.server = app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`)
})

module.exports = app

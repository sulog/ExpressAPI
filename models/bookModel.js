var mongoose = require('mongoose')

var { Schema } = mongoose

var bookModel = new Schema(
  {
    title: { type: String },
    genre: { type: String },
    author: { type: String },
    read: { type: Boolean, default: false },
  }
)

module.exports = mongoose.model('Book', bookModel)

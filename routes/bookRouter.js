var express = require('express')
var booksController = require('../controllers/booksController')

function routes(Book) {
  var booksRouter = express.Router()
  var controller = booksController(Book)
  booksRouter.route('/Books')
    .post(controller.post)
    .get(controller.get)
  booksRouter.use('/Books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err)
      }
      if (book) {
        req.book = book
        return next()
      }
      else {
        return res.sendStatus(404)
      }
    })
  })
  booksRouter.route('/Books/:bookId')
    .get((req, res) => {
      var newBook = req.book.toJSON()
      newBook.links = {}
      newBook.links.FilterByGenre = `http://${req.headers.host}/api/books?genre=${req.book.genre.replace(' ','%20')}`
      res.json(newBook)
    })
    .put((req, res) => {
      var { book } = req
      if (req.body._id) {
        delete req.body._id
      }
      Object.entries(req.body).forEach(element => {
        var key = element[0]
        var value = element[1]
        book[key] = value
      });
      book.save((err) => {
        if (err) {
          return res.send(err)
        }
        return res.json(book)
      })
    })
    .patch((req, res) => {
      var { book } = req
      if (req.body._id) {
        delete req.body._id
      }
      Object.entries(req.body).forEach(element => {
        var key = element[0]
        var value = element[1]
        book[key] = value
      });
      book.save((err) => {
        if (err) {
          return res.send(err)
        }
        return res.json(book)
      })
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err)
        }
        return res.sendStatus(204)
      })
    })
  return booksRouter
}

module.exports = routes
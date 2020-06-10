var should = require('should')
var sinon = require('sinon')
var booksController = require('../controllers/booksController')

describe('Book Controller Tests', () => {
    describe('Post', () => {
        it('should not allow empty title on post', () => {
            const book = function (book) { this.save = () => { } }
            const req = {
                body: {
                    author: "Author10"
                }
            }
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }

            var controller = booksController(book)
            controller.post(req, res)

            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args}`)
            res.send.calledWith('title is required').should.equal(true)
        })
    })
})
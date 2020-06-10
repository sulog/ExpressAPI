require('should')
process.env.ENV = 'Test'
var app = require('../app')

var request = require('supertest')
var mongoose = require('mongoose')
var book = mongoose.model('Book')
var agent = request.agent(app)

describe('Book crud test', () => {
    it('should allow to post book and return _id and read', (done) => {
        const bookPost = { title: "Test book", author: "Test book author", genre: "Fiction" }
        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, result) => {
                result.body.should.have.property('_id')
                done()
            })
    })
    afterEach((done) => {
        book.deleteMany({}).exec()
        done()
    })
    after((done) => {
        mongoose.connection.close()
        app.server.close(done())
    })
})


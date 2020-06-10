function booksController(Book) {
    function post(req, res) {
        var book = new Book(req.body)
        if (!req.body.title) {
            res.status(400)
            return res.send('title is required')
        }
        book.save()
        res.status(201)
        return res.json(book)
    }
    function get(req, res) {
        var { query } = req
        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err)
            }
            var returnBooks = books.map((book) => {
                let newBook = book.toJSON()
                newBook.links={}
                newBook.links.self=`http://${req.headers.host}/api/books/${book._id}`
                return newBook
            })
            return res.json(returnBooks)
        })
    }
    return { post, get }
}

module.exports = booksController
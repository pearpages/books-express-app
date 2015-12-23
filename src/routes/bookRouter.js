var express = require('express');

var bookRouter = express.Router();

var router = function(nav) {
    var books = [
        {
            title: 'title title title',
            genre: 'genre',
            author: 'Blah bleh bloh',
            read: false
        },
        {
            title: 'title title title',
            genre: 'genre',
            author: 'Blah bleh bloh',
            read: false
        },
        {
            title: 'title title title',
            genre: 'genre',
            author: 'Blah bleh bloh',
            read: false
        },
        {
            title: 'title title title',
            genre: 'genre',
            author: 'Blah bleh bloh',
            read: false
        },
        {
            title: 'title title title',
            genre: 'genre',
            author: 'Blah bleh bloh',
            read: false
        },
        {
            title: 'title title title',
            genre: 'genre',
            author: 'Blah bleh bloh',
            read: false
        }
    ];

    bookRouter.route('/')
        .get(function(req,res) {
            res.render('books',{
                nav: nav,
                title:'Books',
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function(req,res) {
            var id= req.params.id;
            res.render('book',{
                nav:nav,
                title:'Books',
                books: books[id]
            });
        });

    return bookRouter;
};

module.exports = router;
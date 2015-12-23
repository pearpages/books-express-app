var express = require('express');
var app = express();
var port = process.env.PORT || 5000; //process.env is defined in the gulpfile, serve task
var bookRouter = express.Router();

// looks in folders in this order
app.use(express.static('public')); //serves static files that are in the public folder
app.set('views', './src/views');
app.set('view engine','ejs');

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
            nav:[
                {Link: '/books', Text: 'Books'},
                {Link: '/authors', Text: 'Authors'}
            ],
            title:'Books',
            books: books
        });
    });

bookRouter.route('/:id')
    .get(function(req,res) {
        var id= req.params.id;
        res.render('book',{
            nav:[
                {Link: '/books', Text: 'Books'},
                {Link: '/authors', Text: 'Authors'}
            ],
            title:'Books',
            books: books[id]
        });
    });

app.use('/books', bookRouter);

app.get('/',function(req, res) {
    res.render('index',{
        nav:[
            {Link: '/books', Text: 'Books'},
            {Link: '/authors', Text: 'Authors'}
        ],
        title:'Cool title'
    });
});

//app.get('/books',function(req, res) {
//    res.send('hello Books');
//});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
var express = require('express');
var app = express();
var port = process.env.PORT || 5000; //process.env is defined in the gulpfile, serve task

var nav = [
    {Link: '/books', Text: 'Books'},
    {Link: '/authors', Text: 'Authors'}
];
var bookRouter = require('./src/routes/bookRouter')(nav);
var adminRouter = require('./src/routes/adminRoutes')();

// looks in folders in this order
app.use(express.static('public')); //serves static files that are in the public folder
app.set('views', './src/views');
app.set('view engine','ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/',function(req, res) {
    res.render('index',{
        nav: nav,
        title:'Cool title'
    });
});

//app.get('/books',function(req, res) {
//    res.send('hello Books');
//});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
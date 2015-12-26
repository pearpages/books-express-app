(function() {
    var express = require('express');
    var app = express();
    var port = process.env.PORT || 5000; //process.env is defined in the gulpfile, serve task
    var bodyParser = require('body-parser');

    var nav = [{
        Link: '/books',
        Text: 'Books'
    }, {
        Link: '/authors',
        Text: 'Authors'
    }];
    var bookRouter = require('./routes/bookRouter')(nav);
    var adminRouter = require('./routes/adminRoutes')();
    var authRouter = require('./routes/authRoutes')();

    // looks in folders in this order
    app.use(express.static('./public')); //serves static files that are in the public folder
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.set('views', './src/views'); //middleware
    app.set('view engine', 'ejs');

    app.use('/books', bookRouter);
    app.use('/admin', adminRouter);
    app.use('/auth', authRouter);

    app.get('/', function(req, res) {
        res.render('index', {
            nav: nav,
            title: 'Cool title'
        });
    });

    //app.get('/books',function(req, res) {
    //    res.send('hello Books');
    //});

    app.listen(port, function(err) {
        console.log('running server on port ' + port);
    });
})();

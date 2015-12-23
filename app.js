var express = require('express');
var app = express();
var port = process.env.PORT || 5000; //process.env is defined in the gulpfile, serve task

// looks in folders in this order
app.use(express.static('public')); //serves static files that are in the public folder
app.set('views', './src/views');
app.set('view engine','ejs');

app.get('/',function(req, res) {
    res.render('index',{list:['1','2','4'],title:'Cool title'});
});

app.get('/books',function(req, res) {
    res.send('hello Books');
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
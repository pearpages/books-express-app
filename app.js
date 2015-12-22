var express = require('express');

var app = express();

var port = 5000;

app.get('/',function(req, res) {
    res.send('hello world');
});

app.get('/books',function(req, res) {
    res.send('hello Books');
});

app.listen(5000, function(err) {
    console.log('running server on port ' + port);
});
# Node

## Editors

* Sublime
* Webstorm
* Atom
* Brackets
* Visual Studio

## Template used

[http://www.bootstrapzero.com/bootstrap-template/storystrap](http://www.bootstrapzero.com/bootstrap-template/storystrap)

## Gulp

Task manager for web projects. Installed with NPM. Packaged based.

Tasks to automate with Gulp

* Quality of code and styles
    * gulp-jshint: JSHint (code quality)
        * jshint-stylish
    * gulp-jscs: JSCS (code styles)
* Inject code
    * wiredep (e.g. bower)
    * gulp-inject (own code)
* gulp-nodemon: if any files change, nodemon will automatically restart your node application

## Templating Systems

* Jade (has to be compiled) ```.jade```
* Handlebars (minimalist templating engine) ```.hbs```
* EJS ```.ejs```

### EJS

```
app.set('views', './src/views');
app.set('view engine','ejs');
```

```
<ul class="nav navbar-nav">
    <% for(var i=0; i<list.length; i++) {%>
    <li><a href="#"><%=list[i]%></a></li>
    <%}%>
</ul>
```

## Routing

```javascript
var express = require('express');

var bookRouter = express.Router();

var router = function(nav) {
    var books = [
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
```

```javascript
var require('./src/bookRouter')(nav);

app.use('/books', bookRouter);
```

## Databases

### MSSQL

```bash
npm install mssql --save
```

```javascript
var mssql = require('mssql');

var databaseOptions = {
    user: 'user',
    password: 'password',
    server: 'server',
    database: 'database'
};

mssql.connect(databaseOptions,function(err) {
    console.log(err);
});
```

```javascript
var mssql = require('msqsl'); //here we get the same connection already stablished. Is the way node works.

var request = new mssql.Request();

request.query('select top 10 whatever from table', function(err, recordset) {
   console.log(recordset);
});
```

```javascript
var result = [ { whatever: '1' },
  { whatever: '1000' },
  { whatever: '10000' },
  { whatever: '100000' },
  { whatever: '100001' },
  { whatever: '100002' },
  { whatever: '100003' },
  { whatever: '100004' },
  { whatever: '100005' },
  { whatever: '100006' } ];
```

#### PreparedStatement

```javascript
var result;

var mssql = require('mssql');

var ps = new mssql.PreparedStatement();
ps.input('id',sql.Int);
ps.prepare('select * from books wehre id = @id', function(err) {
    ps.execute({id:req.params.id},function(err,recordset) {
        var result = recordset[0]; //the result is an array, so we give back the first one
    });
});
}
```

## MongoDB

**Check Mongoose!!!**

It needs a ```/mongo/db/``` directory to work.

Also it's possible that we have to install **node-gyp** ```npm install -g node-gyp```

### Some basic operations

```
show dbs
use libraryApp
show collections
db.books.find()
db.books.find().toArray().length
db.books.find().pretty()
db.books.remove()
```

### Inserting

```javascript
var mongodb = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/libraryApp'; //std mongodb port

mongodb.connect(url, function(err, db) {
    if (err) {
        res.send(err);
    }
    var collection = db.collection('books');
    //collection.insertOne() <-- for one
    collection.insertMany(books, function(err, results) {
        if (err) {
            res.send(err);
        }
        res.send(results);
        db.close();
    });
});
```

### Select One by Id

```javascript
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID
var bookRouter = express.Router();

bookRouter.route('/:id')
    .get(function(req,res) {
        var id = new  objectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp'; //std mongodb port

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({_id: id}, function(err, results) {
                    console.log(results);
                    res.render('book',{
                        nav: nav,
                        title:'Books',
                        books: results
                    });
                    db.close();
                });
            });
    });
```

## Authentication


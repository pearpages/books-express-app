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
# Node

## Editors

* Sublime
* Webstorm
* Atom
* Brackets
* Visual Studio

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
bookRouter.route('/')
    .get(function(req,res) {
        res.send('Hello Books');
    });

bookRouter.route('/single')
    .get(function(req,res) {
        res.send('Hello Single Book');
    });

app.use('/books', bookRouter);
```
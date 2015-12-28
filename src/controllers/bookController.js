(function() {
    var mongo = require('../utils/mongo');
    var ObjectId = require('mongodb').ObjectID;
    //revealing model pattern

    var bookController = function(bookService, nav) {

        var getIndex = function(req, res) {
            mongo(function(err, db) {
                var collection = db.collection('books');
                collection.find().toArray(function(err, results) {
                    res.render('books', {
                        nav: nav,
                        title: 'Books',
                        books: results
                    });
                    db.close();
                });
            });
        };

        var getById = function(req, res) {
            var id = new ObjectId(req.params.id);
            mongo(function(err, db) {
                var collection = db.collection('books');
                collection.findOne({
                    _id: id
                }, function(err, results) {
                    console.log(results);
                    res.render('book', {
                        nav: nav,
                        title: 'Books',
                        books: results
                    });
                    db.close();
                });
            });
        };

        var middleware = function(req,res,next) {
            if(!req.user) {
                res.redirect('/');
            }
            next();
        };

        return {
            getIndex: getIndex,
            getById: getById,
            middleware: middleware
        };
    };

    module.exports = bookController;
}());

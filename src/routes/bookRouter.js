(function() {
    var express = require('express');

    var bookRouter = express.Router();
    var mongodb = require('mongodb').MongoClient;
    var ObjectId = require('mongodb').ObjectID;

    var router = function(nav) {

        bookRouter.route('/')
            .get(function(req, res) {
                require('../utils/mongo')(function(err, db) {
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
            });

        bookRouter.route('/:id')
            .get(function(req, res) {
                var id = new ObjectId(req.params.id);
                require('../utils/mongo')(function(err, db) {
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
            });

        return bookRouter;
    };

    module.exports = router;
})();

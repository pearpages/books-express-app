(function() {
    var express = require('express');
    var adminRouter = express.Router();
    var mongodb = require('mongodb').MongoClient;
    var books = [{
        title: 'title title title43',
        genre: 'genre',
        author: 'Blah bleh bloh',
        read: false
    }, {
        title: 'title title title2',
        genre: 'genre',
        author: 'Blah bleh bloh',
        read: false
    }, {
        title: 'title title titl3e',
        genre: 'genre',
        author: 'Blah bleh bloh',
        read: false
    }, {
        title: 'title title 4title',
        genre: 'genre',
        author: 'Blah bleh bloh',
        read: false
    }, {
        title: 'title title 5title',
        genre: 'genre',
        author: 'Blah bleh bloh',
        read: false
    }, {
        title: 'title title 6title',
        genre: 'genre',
        author: 'Blah bleh bloh',
        read: false
    }];

    var router = function(nav) {

        adminRouter.route('/add-books')
            .get(function(req, res) {
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
            });

        return adminRouter;
    };

    module.exports = router;
})();

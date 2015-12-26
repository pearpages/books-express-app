(function (){
    var mongodb = require('mongodb').MongoClient;

    var url = 'mongodb://localhost:27017/libraryApp';

    module.exports = function(fn) {
        mongodb.connect(url,fn);
    };
}());
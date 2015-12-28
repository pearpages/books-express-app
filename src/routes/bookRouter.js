(function() {
    var express = require('express');
    var bookRouter = express.Router();

    var router = function(nav) {

        var bookController = require('../controllers/bookController')(null,nav);

        //if we are not logged
        bookRouter.use(bookController.middleware);

        bookRouter.route('/')
            .get(bookController.getIndex);

        bookRouter.route('/:id')
            .get(bookController.getById);

        return bookRouter;
    };

    module.exports = router;
})();

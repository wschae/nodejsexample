var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function(nav){
    var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        }
    ];
    bookRouter.route('/')
    .get(function(req, res){
        var request = new sql.Request();

        request.query('select * from books', function(err, recordset){
            console.log(recordset);
            res.render('books', {
                title:'Hello from render',
                nav: nav,
                books:recordset
            });
        });
    }); 

    bookRouter.route('/:id')
    .get(function(req, res){
        var id = req.params.id;
        var ps = new sql.PreparedStatement();
        ps.input('id', sql.Int);
        ps.prepare(`select * from books where id = ${id}`,
            function(err){
                ps.execute({Id:req.params.id},
                    function(err, recordset) {
                        console.log(recordset);
                        res.render('bookView', {
                            title:'Books',
                            nav: nav,
                            book:recordset[0]
                        });
                    }
                )
            });
    });

    return bookRouter;
};
module.exports = router;
var express = require('express');
var app = express();
var sql = require('mssql');
var config = {
    user: '...',
    password: '...',
    server: 'wochaesqldb.database.windows.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'Books',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
};
sql.connect(config, function(err){
  console.log(err);
});

var port = process.env.PORT || 5000;

var nav = [{
    Link:'/Books',
    Text:'Books!'
  }, {
    Link:'/Authors',
    Text:'Authors!'
  }];

// var bookRouter = express.Router();
var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
// app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.get('/', function(req, res) {
    // res.send('Hello World!');
    res.render('index', {
        title:'Hello from render',
        nav: nav});
});

app.get('/books', function(req, res) {
    res.send('Hello Books!');
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});

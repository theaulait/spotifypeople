var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var dust = require('dustjs-helpers');
var pg = require('pg');
var override = require('method-override');
var connection = "postgres://MyRiceBowl@localhost:5432/people";
var app = express();


// var config = {
//   user: 'MyRiceBowl',
//   database: 'people',
//   host: 'localhost',
//   port: 5432,
// };

//var pool = new pg.Pool(config);
var env = process.env.DATABASE_URL || connection;

const port = process.env.PORT || 3000;

//Engine
app.engine('dust', consolidate.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(override('_method'));

//GET the table
app.get('/', function(req, res){

  pg.connect(env, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM person', function(err, result) {
    done(err);
    if(err) {
      return console.error('error running query', err);
      }
    res.render('index', {people: result.rows});
    });
  });
});

//POST to the table
app.post('/add', function(req, res){

  var name = req.body.name;
  var city = req.body.favoritecity;

  pg.connect(env, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('INSERT INTO person(name, favoriteCity) VALUES($1, $2)', [name, city])
    done(err);
    if(err) {
      return console.error('error running query', err);
      }
    res.redirect('/');
    });
});

//DElETE row
app.delete('/delete/:id', function(req, res){

  pg.connect(env, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('DELETE FROM person WHERE id=$1',[req.params.id]);
    done(err);
    if(err) {
      return console.error('error running query', err);
      }
    res.send(200);
    });
});

//POST/PUT rows
app.post('/edit', function(req, res){
  console.log(req.body)
  // var name = req.body.name;
  // var city = req.body.favoriteCity;
  // var id = parseInt(req.body.id);
  pg.connect(env, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('UPDATE person SET name=$1, favoritecity=$2 WHERE id = $3', [req.body.name, req.body.favoritecity, req.body.id]);
    done(err);
    if(err) {
      return console.error('error running query', err);
      }
    res.redirect('/');
    });
});


app.listen(port, function(){
  console.log("Server on port: " + port);
});




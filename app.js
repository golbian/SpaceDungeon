// reads in our .env file and makes those values available as environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const hbs = require('express-handlebars');
const path = require('path');

const routes = require('./routes/main');
const secureRoutes = require('./routes/secure');
const passwordRoutes = require('./routes/password');

// setup mongo connection
const url = 'mongodb://'+process.env.DB_USER +':'+ process.env.DB_PASSWORD +'@'+ process.env.MONGO_CONNECTION_URL+"/"+ process.env.DB_NAME;
mongoose.connect(url, { useNewUrlParser : true, useCreateIndex: true , useUnifiedTopology: true});
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});
mongoose.set('useFindAndModify', false);

// create an instance of an express app
const app = express();

// handlebars engine

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'forgot-password', layoutsDir: __dirname + 'public/templates/', partialsDir: path.resolve('./templates/')}));
app.set('views', path.join(__dirname, 'public/templates'));
app.set('view engine', 'hbs');

//setup web socket

const server = require('http').Server(app);
const io = require('socket.io').listen(server);
 
const players = {};
 
io.on('connection', function (socket) {
  console.log('a user connected: ', socket.id);
  // create a new player and add it to our players object
  players[socket.id] = {
    playerId: socket.id
  };
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);
 
  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });
});

// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());

// require passport auth
require('./auth/auth');

/*
app.get('/game.html', passport.authenticate('jwt', { session : false }), function (req, res) {
  res.sendFile(__dirname + '/public/game.html');
});
*/

app.get('/game.html', function (req, res) {
  res.sendFile(__dirname + '/public/game.html');
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// main routes
app.use('/', routes);
app.use('/', passwordRoutes);
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);

// catch all other routes
app.use((req, res, next) => {
  res.status(404).json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// have the server start listening on the provided port
server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port ${process.env.PORT || 8080}`);
});

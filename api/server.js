const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/database'),
    passport = require('passport');

mongoose.connect(config.database);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully');
})

const app = express();

const users = require('./routes/users');
const products = require('./routes/products');
const providers = require('./routes/providers');
const dinningRooms = require('./routes/dinningRooms');
<<<<<<< HEAD
const orders = require('./routes/orders');
=======
const units = require('./routes/units');
>>>>>>> 61fa8a3c118543548f0a84374add486021ac2674

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)

app.use('/users', passport.authenticate('jwt', {session:false}), users.protected)
app.use('/auth', users.unprotected)
app.use('/products', passport.authenticate('jwt', {session:false}), products.protected)
app.use('/providers', passport.authenticate('jwt', {session:false}), providers.protected)
app.use('/dinningRooms', passport.authenticate('jwt', {session:false}), dinningRooms.protected)
<<<<<<< HEAD
app.use('/orders', passport.authenticate('jwt', {session:false}), orders.protected)

=======
app.use('/units', passport.authenticate('jwt', {session:false}), units.protected)
>>>>>>> 61fa8a3c118543548f0a84374add486021ac2674

app.get('/', (req,res)=>{
    res.send('Invalid Endpoint');
})

app.listen(4000, ()=> {console.log('Express Server on 4000')})

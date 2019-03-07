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

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport)

app.use('/users', passport.authenticate('jwt', {session:false}), users.protected)
app.use('/auth', users.unprotected)

app.get('/', (req,res)=>{
    res.send('Invalid Endpoint');
})

app.listen(4000, ()=> {console.log('Express Server on 4000')})
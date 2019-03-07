const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');



const User = require ('./models/User');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/foodApp');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully');
})

//All users
router.route('/users').get((req, res)=>{
    User.find((err, users) =>{
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    })
});

//Specific User
router.route('/users/:id').get((req, res)=>{
    User.findById(req.params.id,(err, user) =>{
        if(err){
            console.log(err);
        }else{
            res.json(user);
        }
    })
});

//Add User
router.route('/users/add').post((req, res)=>{
    let user = new User(req.body);
    user.save()
        .then(user =>{
            res.status(200).json({'user': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new record');
        });
});

//Update User
router.route('/users/update/:id').post((req, res)=>{
    User.findById(req.params.id,(err, user) =>{
        if(!user){
            return next(new Error('Could not load document'));
        }else{
            user.name = req.body.name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.role = req.body.role;
            
            user.save()
                .then(user =>{
                    res.json('Update done');
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete User
router.route('/users/delete/:id').get((req, res)=>{
    User.findByIdAndRemove({_id: req.params.id},(err, user) =>{
        if(err){
            res.json(err);
        }else{
            res.json('Removed successfully');
        }
    })
});

app.use('/', router);


app.listen(4000, ()=> {console.log('Express Server on 4000')})
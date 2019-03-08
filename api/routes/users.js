const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const config = require('../config/database');
const User = require('../models/User');

const bcrypt = require('bcryptjs')

//All users
routerProtected.route('/').get((req, res)=>{
    User.find((err, users) =>{
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    })
});

//Specific User
routerProtected.route('/:id').get((req, res)=>{
    User.findById(req.params.id,(err, user) =>{
        if(err){
            console.log(err);
        }else{
            res.json(user);
        }
    })
});

//Add User
routerProtected.route('/add').post((req, res)=>{
    
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(req.body.password,salt, (err, hash)=>{
            if(err){
                throw err;
            }
            let user = new User({
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash,
                role: req.body.role
            });
            user.save()
                .then(user =>{
                    res.status(200).json({'user': 'Added successfully'});
                })
                .catch(err =>{
                    res.status(400).send('Failed to create new record');
                });
        })
    })

    
});

//Update User
routerProtected.route('/update/:id').post((req, res)=>{
    User.findById(req.params.id,(err, user) =>{
        if(!user){
            return next(new Error('Could not load document'));
        }else{
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(req.body.password,salt, (err, hash)=>{
                    if(err){
                        throw err;
                    }
                    user.name = req.body.name;
                    user.last_name = req.body.last_name;
                    user.email = req.body.email;
                    user.password = hash;
                    user.role = req.body.role;

                    user.save()
                        .then(user =>{
                            res.json('Update done');
                        })
                        .catch(err =>{
                            res.status(400).send('Update failed');
                        });
                })
            })
            
            
            
        }
    })
});

//Delete User
routerProtected.route('/delete/:id').get((req, res)=>{
    User.findByIdAndRemove({_id: req.params.id},(err, user) =>{
        if(err){
            res.json(err);
        }else{
            res.json('Removed successfully');
        }
    })
});

router.route('/login').post((req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, (err, user)=>{
        if(err){
            throw err;
        }
        if(!user){
            
            res.json({success: false, msg: 'Invalid email or password'});
        }else{
            User.comparePassword(password, user.password, (err, isMatch)=>{
                if(err){
                    throw err;
                }
    
                if(isMatch){
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 14400 //4 hours
                    });
    
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user:{
                            id: user._id,
                            name: user.name,
                            last_name: user.last_name,
                            email: user.email,
                            role: user.role
                        }
                    })
                } else {
                    return res.json({success: false, msg: "Invalid email or password"});
                }
            })
        }
    })
})

module.exports = {
    protected : routerProtected,
    unprotected : router
};

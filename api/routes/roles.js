const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const config = require('../config/database');
const Role = require('../models/Role');


//All Roles
routerProtected.route('/').get((req, res)=>{
    Role.find((err, roles) =>{
        if(err){
            console.log(err);
        }else{
            res.json(roles);
        }
    })
});

//Specific Role
routerProtected.route('/:id').get((req, res)=>{
    Role.findById(req.params.id,(err, role) =>{
        if(err){
            console.log(err);
        }else{
            res.json(role);
        }
    })
});

//Add Role
routerProtected.route('/add').post((req, res)=>{
            let role = new Role({
                name: req.body.name
            });
            role.save()
                .then(role =>{
                    res.status(200).json({'role': 'Added successfully'});
                })
                .catch(err =>{
                    res.status(400).send('Failed to create new record');
                });
});

//Update Role
routerProtected.route('/update/:id').post((req, res)=>{
    Role.findById(req.params.id,(err, role) =>{
        if(!role){
            return next(new Error('Could not load document'));
        }else{
            role.name = req.body.name;

            role.save()
                .then(role =>{
                    res.json('Update done');
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete Role
routerProtected.route('/delete/:id').get((req, res)=>{
    Role.findByIdAndRemove({_id: req.params.id},(err, role) =>{
        if(err){
            res.json(err);
        }else{
            res.json('Removed successfully');
        }
    })
});

module.exports = {
    protected : routerProtected,
    unprotected : router
};

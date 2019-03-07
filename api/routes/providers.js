const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const config = require('../config/database');
const Provider = require('../models/Provider');


//All providers
routerProtected.route('/').get((req, res)=>{
    Provider.find((err, providers) =>{
        if(err){
            console.log(err);
        }else{
            res.json(providers);
        }
    })
});

//Specific Provider
routerProtected.route('/:id').get((req, res)=>{
    Provider.findById(req.params.id,(err, provider) =>{
        if(err){
            console.log(err);
        }else{
            res.json(provider);
        }
    })
});

//Add Provider
routerProtected.route('/add').post((req, res)=>{
            let provider = new Provider({
                name: req.body.name,
                contact: req.body.contact,
                phone: req.body.phone,
                email: req.body.email,
                rfc: req.body.rfc,
                pc: req.body.pc,
                street: req.body.street,
                number: req.body.number,
                ext_number:req.body.ext_number,
                colony: req.body.colony
            });
            provider.save()
                .then(provider =>{
                    res.status(200).json({'provider': 'Added successfully'});
                })
                .catch(err =>{
                    res.status(400).send('Failed to create new record');
                });
});

//Update Provider
routerProtected.route('/update/:id').post((req, res)=>{
    Provider.findById(req.params.id,(err, provider) =>{
        if(!provider){
            return next(new Error('Could not load document'));
        }else{
            provider.name = req.body.name;
            provider.contact = req.body.contact;
            provider.phone = req.body.phone;
            provider.email = req.body.email;
            provider.rfc = req.body.rfc;
            provider.pc = req.body.pc;
            provider.street = req.body.street;
            provider.number = req.body.number;
            provider.ext_number = req.body.ext_number;
            provider.colony = req.body.colony;

            provider.save()
                .then(provider =>{
                    res.json('Update done');
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete Provider
routerProtected.route('/delete/:id').get((req, res)=>{
    Provider.findByIdAndRemove({_id: req.params.id},(err, provider) =>{
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

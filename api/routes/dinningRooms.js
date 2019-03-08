const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const config = require('../config/database');
const DinningRoom = require('../models/DinningRoom');


//All DinningRooms
routerProtected.route('/').get((req, res)=>{
    DinningRoom.find((err, dinningRooms) =>{
        if(err){
            console.log(err);
        }else{
            res.json(dinningRooms);
        }
    })
});

//Specific DinningRoom
routerProtected.route('/:id').get((req, res)=>{
    DinningRoom.findById(req.params.id,(err, dinningRoom) =>{
        if(err){
            console.log(err);
        }else{
            res.json(dinningRoom);
        }
    })
});

//Add DinningRoom
routerProtected.route('/add').post((req, res)=>{
            let dinningRoom = new DinningRoom({
                street: req.body.street,
                chefManager: req.body.chefManager,
                phone: req.body.phone,
                name: req.body.name,
                pc: req.body.pc,
                number: req.body.number,
                ext_number:req.body.ext_number,
                colony: req.body.colony
            });
            
            dinningRoom.save()
                .then(dinningRoom =>{
                    res.status(200).json({'dinningRoom': 'Added successfully'});
                })
                .catch(err =>{
                    res.status(400).send('Failed to create new record');
                });
});

//Update DinningRoom
routerProtected.route('/update/:id').post((req, res)=>{
    DinningRoom.findById(req.params.id,(err, dinningRoom) =>{
        if(!dinningRoom){
            return next(new Error('Could not load document'));
        }else{
            dinningRoom.street = req.body.street;
            dinningRoom.chefManager = req.body.chefManager;
            dinningRoom.phone = req.body.phone;
            dinningRoom.name = req.body.name;
            dinningRoom.pc = req.body.pc;
            dinningRoom.number = req.body.number;
            dinningRoom.ext_number = req.body.ext_number;
            dinningRoom.colony = req.body.colony;

            dinningRoom.save()
                .then(dinningRoom =>{
                    res.json('Update done');
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete DinningRoom
routerProtected.route('/delete/:id').get((req, res)=>{
    DinningRoom.findByIdAndRemove({_id: req.params.id},(err, dinningRoom) =>{
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
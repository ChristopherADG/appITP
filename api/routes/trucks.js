const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const Truck = require('../models/Trucks');


//All trucks
routerProtected.route('/').get((req, res)=>{
    Truck.find((err, trucks) =>{
        if(err){
            console.log(err);
        }else{
            res.json(trucks);
        }
    })
});

//Specific Truck
routerProtected.route('/:id').get((req, res)=>{
    Truck.findById(req.params.id,(err, truck) =>{
        if(err){
            console.log(err);
        }else{
            res.json(truck);
        }
    })
});

//Add Truck
routerProtected.route('/add').post((req, res)=>{
            let truck = new Truck({
                driverName: req.body.driverName,
                phone: req.body.phone,
                licPlate: req.body.licPlate,
                carrCapacity: req.body.carrCapacity
            });
            truck.save()
                .then(truck =>{
                    res.status(200).json({'truck': 'Added successfully'});
                })
                .catch(err =>{
                    res.status(400).send('Failed to create new record');
                });
});

//Update Truck
routerProtected.route('/update/:id').post((req, res)=>{
    Truck.findById(req.params.id,(err, truck) =>{
        if(!truck){
            return next(new Error('Could not load document'));
        }else{
            truck.driverName = req.body.driverName;
            truck.phone = req.body.phone;
            truck.licPlate = req.body.licPlate;
            truck.carrCapacity = req.body.carrCapacity;

            truck.save()
                .then(truck =>{
                    res.json('Update done');
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete Truck
routerProtected.route('/delete/:id').get((req, res)=>{
    Truck.findByIdAndRemove({_id: req.params.id},(err, truck) =>{
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
const express = require('express');

const routerProtected = express.Router();
const Shipping = require('../models/Shipping');
const ApprovedOrder = require('../models/ApprovedOrders');

//All shippings
routerProtected.route('/').get((req, res)=>{
    Shipping.find((err, shippings) =>{
        if(err){
            console.log(err);
        }else{
            res.json(shippings);
        }
    })
});

//Specific shipping
routerProtected.route('/:id').get((req, res)=>{
    Shipping.findById(req.params.id,(err, shipping) =>{
        if(err){
            res.send(null);
        }else{
            res.json(shipping);
        }
    })
});

//Add Shipping
routerProtected.route('/add').post((req, res)=>{
    var date = new Date();
    let shipping = new Shipping({
        driverName: req.body.driverName,
        products: req.body.products,
        destiny: req.body.destiny
    });
    console.log(shipping)
    shipping.save()
        .then(shipping =>{
            res.status(200).json({'shipping': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new record');
        });
});

//Update Shipping
routerProtected.route('/update/:id').post((req, res)=>{
    Shipping.findById(req.params.id,(err, shipping) =>{
        if(!shipping){
            return next(new Error('Could not load document'));
        }else{
            shipping.driverName=req.body.driverName;
            shipping.products=req.body.products;
            shipping.destiny=req.body.destiny;

            shipping.save()
                .then(shipping =>{
                    res.json('Update done');
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete User
routerProtected.route('/delete/:id').get((req, res)=>{
    Shipping.findByIdAndRemove({_id: req.params.id},(err, user) =>{
        if(err){
            res.json(err);
        }else{
            res.json('Removed successfully');
        }
    })
});

module.exports = {
    protected : routerProtected
};

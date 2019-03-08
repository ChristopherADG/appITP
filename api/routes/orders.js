const express = require('express');

const routerProtected = express.Router();
const User = require('../models/User');
const Product = require('../models/Products');
const Unit = require('../models/Units');
const Order = require('../models/Order');

//All orders
routerProtected.route('/').get((req, res)=>{
    Order.find((err, orders) =>{
        if(err){
            console.log(err);
        }else{
            res.json(orders);
        }
    })
});


//Specific User
routerProtected.route('/:id').get((req, res)=>{
    Order.findById(req.params.id,(err, order) =>{
        if(err){
            console.log(err);
        }else{
            res.json(order);
        }
    })
});

//Add Order
routerProtected.route('/add').post((req, res)=>{
    console.log(req.body)
    let order = new Order({
      user: req.body.user,
      dinningRoom: req.body.dinningRoom,
      description: req.body.description,
      quantity: req.body.quantity,
      units: req.body.unit,
      products: req.body.product,
      status: req.body.status
    });
    order.save()
        .then(order =>{
            res.status(200).json({'order': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new record');
        });
});

//Update Order
routerProtected.route('/update/:id').post((req, res)=>{
    Order.findById(req.params.id,(err, order) =>{
        if(!order){
            return next(new Error('Could not load document'));
        }else{
            order.user= req.body.user,
            order.dinningRoom= req.body.dinningRoom,
            order.description= req.body.description,
            order.quantity=req.body.quantity,
            order.units=req.body.unit,
            order.products=req.body.product,
            order.status=req.body.status

            order.save()
                .then(order =>{
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
    Order.findByIdAndRemove({_id: req.params.id},(err, user) =>{
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

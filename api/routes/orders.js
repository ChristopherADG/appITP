const express = require('express');

const routerProtected = express.Router();
const Order = require('../models/Order');
const ApprovedOrder = require('../models/ApprovedOrders');

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

routerProtected.route('/approvedOrders').get((req, res)=>{
    ApprovedOrder.find((err, orders) =>{
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
            res.send(null);
        }else{
            res.json(order);
        }
    })
});

routerProtected.route('/approvedOrders/:id').get((req, res)=>{
    ApprovedOrder.findById(req.params.id, (err, order) =>{
        if(err){
            console.log(err);
        }else{
            res.json(order);
        }
    })
});

//Add Order
routerProtected.route('/add').post((req, res)=>{
    var date = new Date();
    let order = new Order({
        date: date.toJSON().slice(0,10).replace(/-/g,'/'),
        time: date.toTimeString().substr(0,8),
        user: req.body.user,
        dinningRoom: req.body.dinningRoom,
        description: req.body.description,
        products: req.body.products,
        status: req.body.status
    });
    console.log(order)
    order.save()
        .then(order =>{
            res.status(200).json({'order': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new record');
        });
});

//Update Order
routerProtected.route('/approvedOrders/update/:id').post((req, res)=>{
    ApprovedOrder.findById(req.params.id,(err, order) =>{
        if(!order){
            return next(new Error('Could not load document'));
        }else{
            order.products = req.body

            cont = 0
            order.products.forEach(product => {
                if(product.status == 1){
                    cont++;
                }
            });
            if(cont == order.products.length){
                order.status = 2
            }

            order.save()
                .then(order =>{
                    res.json(order);
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//get by status Order
routerProtected.route('/status/:statusid').get((req, res)=>{
    //console.log(req.params.statusid)
    Order.find({"status": req.params.statusid},(err, orders) =>{
        if(err){
            console.log(err);
        }else{
            res.json(orders);
        }
    })
});

routerProtected.route('/approvedOrders/status/:statusid').get((req, res)=>{
    //console.log(req.params.statusid)
    ApprovedOrder.find({"status": req.params.statusid},(err, orders) =>{
        if(err){
            console.log(err);
        }else{
            res.json(orders);
        }
    })
});

//approve Order
routerProtected.route('/approve').post((req, res)=>{
    Order.findById(req.body.original,(err, order) =>{
        if(!order){
            return next(new Error('Could not load document'));
        }else{
            order.status=1

            order.save()
        }
    })
    let newOrder = new ApprovedOrder({
        date: req.body.date,
        time: req.body.time,
        user: req.body.user,
        dinningRoom: req.body.dinningRoom,
        description: req.body.description,
        products: req.body.products,
        status: req.body.status,
        original: req.body.original,
        approveObservations: req.body.approveObservations,
        approveUser: req.body.approveUser
    });
    newOrder.save()
        .then(order =>{
            res.status(200).json({'order': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new record');
        });
});

//deny Order
routerProtected.route('/deny').post((req, res)=>{
    console.log(req.body)
    Order.findById(req.body.original,(err, order) =>{
        if(!order){
            return next(new Error('Could not load document'));
        }else{
            order.status=-1

            order.save()
        }
    })

    let newOrder = new ApprovedOrder({
        date: req.body.date,
        time: req.body.time,
        user: req.body.user,
        dinningRoom: req.body.dinningRoom,
        description: req.body.description,
        products: req.body.products,
        status: req.body.status,
        original: req.body.original,
        approveObservations: req.body.approveObservations,
        approveUser: req.body.approveUser
        
    });
    newOrder.save()
        .then(order =>{
            res.status(200).json({'order': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new record');
        });
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
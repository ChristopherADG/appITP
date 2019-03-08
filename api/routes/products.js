const express = require('express');

const routerProtected = express.Router();
const User = require('../models/User');
const Product = require('../models/Products');
const Unit = require('../models/Units');

//All products
routerProtected.route('/').get((req, res)=>{
    Product.find((err, products) =>{
        if(err){
            console.log(err);
        }else{
            res.json(products);
        }
    })
});

//All units
routerProtected.route('/units').get((req, res)=>{
    Unit.find((err, units) =>{
        if(err){
            console.log(err);
        }else{
            res.json(units);
        }
    })
});

//Add Unit
routerProtected.route('/units/add').post((req, res)=>{
    console.log(req.body)
    let unit = new Unit({
        name: req.body.name
    });
    unit.save()
        .then(unit =>{
            res.status(200).json({'unit': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new record');
        });
});

//Specific User
routerProtected.route('/:id').get((req, res)=>{
    Product.findById(req.params.id,(err, product) =>{
        if(err){
            console.log(err);
        }else{
            res.json(product);
        }
    })
});

//Add Product
routerProtected.route('/add').post((req, res)=>{
    console.log(req.body)
    let product = new Product({
        name: req.body.name,
        unit: req.body.unity,
        category: req.body.category,
        description: req.body.description
    });
    product.save()
        .then(product =>{
            res.status(200).json({'product': 'Added successfully'});
        })
        .catch(err =>{
            res.status(400).send('Failed to create new record');
        });
});

//Update Product
routerProtected.route('/update/:id').post((req, res)=>{
    Product.findById(req.params.id,(err, product) =>{
        if(!product){
            return next(new Error('Could not load document'));
        }else{
            product.name= req.body.name,
            product.unit= req.body.unity,
            product.category= req.body.category,
            product.description= req.body.description

            product.save()
                .then(product =>{
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
    Product.findByIdAndRemove({_id: req.params.id},(err, user) =>{
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

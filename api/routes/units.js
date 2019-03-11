const express = require('express');

const routerProtected = express.Router();
const Unit = require('../models/Units');
const Product = require('../models/Products')

//All units
routerProtected.route('/').get((req, res)=>{
    Unit.find((err, units) =>{
        if(err){
            console.log(err);
        }else{
            res.json(units);
        }
    })
});

//Add Unit
routerProtected.route('/add').post((req, res)=>{
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

//Edit Unit
routerProtected.route('/:id').post((req, res)=>{
    Unit.findById(req.params.id,(err, unit) =>{
        if(!unit){
            return next(new Error('Could not load document'));
        }else{
            unit.name= req.body.name,

            unit.save()
                .then(product =>{
                    res.json('Update done');
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delet Unit
routerProtected.route('/delete/:id').get((req, res)=>{
    Unit.findByIdAndRemove({_id: req.params.id},(err, unit) =>{
        if(err){
            res.json(err);
        }else{
            res.json('Removed successfully');
            Product.find((err, products) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log(products, unit)
                }
            })
        }
    })
});



module.exports = {
    protected : routerProtected
};

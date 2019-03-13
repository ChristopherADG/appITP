const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const Category = require('../models/Category');


//All Categorys
routerProtected.route('/').get((req, res)=>{
    Category.find((err, categories) =>{
        if(err){
            console.log(err);
        }else{
            res.json(categories);
        }
    })
});

//Specific Category
routerProtected.route('/:id').get((req, res)=>{
    Category.findById(req.params.id,(err, category) =>{
        if(err){
            console.log(err);
        }else{
            res.json(category);
        }
    })
});

//Add Category
routerProtected.route('/add').post((req, res)=>{
            let category = new Category({
                name: req.body.name
            });
            category.save()
                .then(category =>{
                    res.status(200).json({'category': 'Added successfully'});
                })
                .catch(err =>{
                    res.status(400).send('Failed to create new record');
                });
});

//Update Category
routerProtected.route('/update/:id').post((req, res)=>{
    Category.findById(req.params.id,(err, category) =>{
        if(!category){
            return next(new Error('Could not load document'));
        }else{
            category.name = req.body.name;

            category.save()
                .then(category =>{
                    res.json('Update done');
                })
                .catch(err =>{
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete Category
routerProtected.route('/delete/:id').get((req, res)=>{
    Category.findByIdAndRemove({_id: req.params.id},(err, category) =>{
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
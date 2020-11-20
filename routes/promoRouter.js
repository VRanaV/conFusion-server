const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const Promotions= require('../models/promotions');

const promoRouter= express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promo)=>{
        console.log('Promo is created');
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put promo is not supported');
})

.delete((req,res,next)=>{
    Promotions.remove({})
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
//////////////////////////////////////////////////////

promoRouter.route('/:promoId')


.get((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post promo is not supported for '+req.params.promoId);
    
})

.put((req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{$set :req.body},{new:true})
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{
    Promotions.findOneAndRemove(req.params.promoId)
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports=promoRouter;
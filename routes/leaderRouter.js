const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const Leaders=require('../models/leaders');
const authenticate = require('../authenticate');
const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.get((req,res,next)=>{
    Leaders.find({})
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        console.log('Leader is created');
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('Put leader is not supported');
})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Leaders.remove({})
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
//////////////////////////////////////////////////////

leaderRouter.route('/:leaderId')

.get((req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('Post leader is not supported for '+req.params.leaderId);
    
})

.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
   Leaders.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new :true})
   .then((leader)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));

})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(result);
        },(err)=>next(err))
        .catch((err)=>next(err));
});

module.exports=leaderRouter;
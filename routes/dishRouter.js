const express= require('express');
const bodyParser= require('body-parser');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{
    res.end('this is a get request');
})

.post((req,res,next)=>{
    res.end('adding'+req.body.name+' with details '+req.body.description);
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put is not supported');
})

.delete((req,res,next)=>{
    res.end('this is a delete request');
});

dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('this is a get request for'+req.params.dishId);
})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post is not supported on'+req.params.dishId);
})

.put((req,res,next)=>{
   res.write('updating',req.params.dishId);
   res.end(' this is put name'+req.body.name+'and the body'+req.body.description);
})

.delete((req,res,next)=>{
    res.end('this is a delete request');
});

module.exports=dishRouter;
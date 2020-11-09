const express=require('express');
const bodyParser=require('body-parser');

const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('this is a get request for leader');
})
.post((req,res,next)=>{
    res.end('adding leader'+req.body.name+' with details '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('put leader is not supported');
})
.delete((req,res,next)=>{
    res.end('delete leader request');
});

//////////////////////////////////////////////////////

leaderRouter.route('/:leaderId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{
    res.end('this is a get request for leader'+req.params.leaderId);
})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post leader is not supported for '+req.params.leaderId);
    
})

.put((req,res,next)=>{
    res.write('this is a put request for'+req.params.leaderId);
    res.end('updating leader '+req.body.name+' with details '+req.body.description);
})

.delete((req,res,next)=>{
    res.end('this is a delete leader request'+req.params.leaderId);
});

module.exports=leaderRouter;
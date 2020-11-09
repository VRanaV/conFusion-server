const express= require('express');
const bodyParser= require('body-parser');

const promoRouter= express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{
    res.end('this is a get request for promo');
})

.post((req,res,next)=>{
    res.end('adding a promo '+req.body.name+' with details '+req.body.description);
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put promo is not supported');
})

.delete((req,res,next)=>{
    res.end('this is a delete promo request');
});
//////////////////////////////////////////////////////

promoRouter.route('/:promoId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{
    res.end('this is a get request for promo'+req.params.promoId);
})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post promo is not supported for '+req.params.promoId);
    
})

.put((req,res,next)=>{
    res.write('this is a put request for'+req.params.promoId);
    res.end('updating promo '+req.body.name+' with details '+req.body.description);
})

.delete((req,res,next)=>{
    res.end('this is a delete promo request'+req.params.promoId);
});

module.exports=promoRouter;
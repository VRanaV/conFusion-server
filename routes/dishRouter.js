const express= require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const Dishes= require('../models/dishes');

const dishRouter=express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req,res,next)=>{
    Dishes.find({})
    .then((dishes)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },
    (err)=>{
        next(err)
    })
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
   Dishes.create(req.body)
   .then((dish)=>{
    console.log('Dish is created ', dish);
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(dish);
   },(err)=>next(err))
   .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put is not supported');
})

.delete((req,res,next)=>{
   Dishes.remove({})
   .then((result)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(result);

   },(err)=>next(err))
   .catch((err)=>next(err));
});
///////////////////////////////
dishRouter.route('/:dishId')

.get((req,res,next)=>{
   Dishes.findById(req.params.dishId)
   .then((dish)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(dish);
   },(err)=>next(err))
   .catch((err)=>next(err));

})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post is not supported on'+req.params.dishId);
})

.put((req,res,next)=>{
   Dishes.findByIdAndUpdate(req.params.dishId,{ $set : req.body},{new:true})
   .then((dish)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(dish);
   },(err)=>next(err))
   .catch((err)=>next(err));

})

.delete((req,res,next)=>{
   Dishes.findByIdAndRemove(req.params.dishId)
   .then((result)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(result);
   },(err)=>next(err))
   .catch((err)=>next(err));

});

//////////////////////

dishRouter.route('/:dishId/comments')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dishes)=>{
        if(dishes!=null){
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes.comments);
        }
        else{
            err= new Error('the dish '+req.params.dishId +'not found!');
            err.statusCode=404;
            return next(err);
        }
        },
    (err)=>{
        next(err)
    })
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null){
        dish.comments.push(req.body);
        dish.save()
        .then((dish)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        },
        (err)=>next(err));
       
        }
        else{
            err= new Error('the dish '+req.params.dishId +'not found!');
            err.statusCode=404;
            return next(err);
        }
        },
    (err)=>{
        next(err)
    })
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put is not supported');
})

.delete((req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dish)=>{
      if(dish!=null){
        for(i=(dish.comments.length-1);i>=0; i--){
            dish.comments.id(dish.comments[i].id).remove();
        }
        dish.save()
        .then((dish)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        },(err)=>next(err));
      }
      else{
          err=new Error('Dish '+req.params.dishId+' not found');
          err.statusCode=404;
          return next(err);
      }
  },(err)=>next(err))
  .catch((err)=>next(err));
});
///////////////////
dishRouter.route('/:dishId/comments/:commentId')

.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentId )!= null){

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null){
            err= new Error('the dish '+req.params.dishId +'not found!');
            err.statusCode=404;
            return next(err);
        }
        else{
            err= new Error('the comment '+req.params.commentId +'not found!');
            err.statusCode=404;
            return next(err);
        }
        },
    (err)=>{
        next(err)
    })
    .catch((err)=>next(err));

})

.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post is not supported on'+req.params.dishId);
})

.put((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentId )!= null){
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating=req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment=req.body.comment;
            }
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },(err)=>next(err));
        
        }
        else if (dish == null){
            err= new Error('the dish '+req.params.dishId +'not found!');
            err.statusCode=404;
            return next(err);
        }
        else{
            err= new Error('the comment '+req.params.commentId +'not found!');
            err.statusCode=404;
            return next(err);
        }
        },
    (err)=>{
        next(err)
    })
    .catch((err)=>next(err));
 
})

.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentId )!= null){
           dish.comments.id(req.params.commentId).remove();
          
          dish.save()
          .then((dish)=>{
              res.statusCode=200;
              res.setHeader('Content-Type','application/json');
              res.json(dish);
          },(err)=>next(err));
        }
        else if (dish == null){
            err= new Error('the dish '+req.params.dishId +'not found!');
            err.statusCode=404;
            return next(err);
        }
        else{
            err= new Error('the comment '+req.params.commentId +'not found!');
            err.statusCode=404;
            return next(err);
        }
        
    },(err)=>next(err))
    .catch((err)=>next(err));

});


module.exports=dishRouter;
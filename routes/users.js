var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User= require('../models/user');
const user = require('../models/user');
var passport =require('passport');
var authenticate= require('../authenticate');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
  User.find({})
  .populate('comments.author')
  .then((users)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  },(err)=>next(err))
  .catch((err)=>next(err));
});

router.post('/signup',(req,res,next)=>{
 User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{

    if(err){
      res.statusCode=500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
    }
    else{
      if(req.body.firstname)
        user.firstname=req.body.firstname;
      if(req.body.lastname)
        user.lastname=req.body.lastname;
        user.save((err,user)=>{
          if(err){
            res.statusCode=500;
            res.setHeader('Content-Type','application/json');
            res.json({err:err});
            return;
          }
          passport.authenticate('local')(req,res,()=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json({successs:true,status:'Registered successfully!'});
          });
        });
    }
  });
 }); 
//auth will automatically set req.user
router.post('/login',passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getToken({_id:req.user._id});
  console.log(req.session);
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({successs:true,token:token,status:'you are logged in!'});

  });

router.get('/logout',(req,res,next)=>{
  if(req.session){
    req.session.destroy();
    //delete req.user.session;
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err= new Error('you are not logged in already');
    err.status=403;
    next(err);
  }
})

module.exports = router;

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User= require('../models/user');
const user = require('../models/user');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res,next)=>{
 User.findOne({username: req.body.username})
 .then((user)=>{
    if(user != null){
      var err = new Error('This user already exists!');
      err.status=403;
      next(err);
    }
    else{
      return User.create({
        username:req.body.username,
        password:req.body.password
      });

    }
 }) //this will return a promise and we will handle it here 
 .then((user)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({status:'Registered successfully!',user :user});

 },(err)=>next(err))
 .catch((err)=>next(err));
});

router.post('/login',(req,res,next)=>{
  if (!req.session.user){
    var authHeader = req.headers.authorization;

    if(!authHeader){
      var err = new Error(' You are not Authorized!');
      res.setHeader('WWW-Authenticate','Basic');
      err.status=401;
      return next(err);
  
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
  
    var username= auth[0];
    var password = auth[1];

    User.findOne({username:username})
    .then((user)=>{
      if(user ===null){
        var err = new Error('User doesnot exist!');
        err.status=403;
        return next(err);
      }
      else if(user.password!==password){
        var err = new Error('Wrong password!');
        err.status=403;
        return next(err);
      }
      else if (user.username ===username && user.password ===password){
        //res.cookie('user','admin',{ signed:true});
        req.session.user='authenticated';
        res.statusCode=200;
        res.setHeader('Content_Type','text/plain');
        res.end('you are authenticated!');
      }
      
    })
    .catch((err)=>next(err));
    
    }
    else{
      res.statusCode=200;
      res.setHeader('Content-Type','text/plain');
      res.end('You are already authenticated');
    }
  });

router.get('/logout',(req,res)=>{
  if(req.session){
    req.session.destroy();
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

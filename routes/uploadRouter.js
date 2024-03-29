const express = require('express');
const bodyParser= require('body-parser');
const authenticate= require('../authenticate');

const multer = require('multer');
//custom configuration for multer
var storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const imageFileFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('File extension not supported!'),false);
    }
    else{
        return cb(null,true);
    }
};
const upload = multer({
    storage:storage,
    fileFilter:imageFileFilter
});
const uploadRouter= express.Router();

uploadRouter.use(bodyParser.json());
uploadRouter.route('/')
.get(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('get is not supported on /uploadimage');
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,upload.single('imageFile'),(req,res)=>{
   res.statusCode=200;
   res.setHeader('Content-Type','application/json');
   res.json(req.file);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('Put is not supported on /uploadimage');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('delete is not supported on /uploadimage');
})


module.exports= uploadRouter;
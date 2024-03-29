const mongoose= require('mongoose');
const { schema } = require('./dishes');
const Schema = mongoose.Schema;

const LeadersSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    }

},{timestamp:true});

var Leaders=mongoose.model('Leader',LeadersSchema);
module.exports=Leaders;
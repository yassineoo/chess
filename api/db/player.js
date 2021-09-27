
const mongoose= require('mongoose');
const player = mongoose.Schema({
    name:{ 
        type:String,
        required : [true, "must have name"],
        trim : true,
        maxlength : [20,"name can not be ùore than 20 carecter"]
    } ,
    id:{ 
        type:String,
        trim : true,
        maxlength : [20,"name can not be ùore than 20 carecter"]
    } ,
    email:{ 
        type:String,
        required : [true, "must have email"],
        required : [true, "must have name"],
    },
    password:{
        type : String,
        required : [true, "must have password"],
        default: 'not marked yet'
    },
    stat:{
        type : [String],
        default: []
    }
    , confirmed:{
        type:Boolean,
        default:false
    },
    token:{
        type: String
    }
})
Player = mongoose.model('players',player);
module.exports = {Player}; 
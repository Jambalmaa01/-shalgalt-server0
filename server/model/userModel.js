const mongoose=require('mongoose')
const jwt =require('jsonwebtoken')
const{Schema}=mongoose

const UserSchema = new Schema(
{    name:{
        type:String,
        trim:true,
        require:true
    },
    password:{
        type:String,
        trim:true,
        require:true,
        min: 6,
        max: 14,
    },
    role:{
        type:String,
        default:'user',
    }
    
})

module.exports =mongoose.model('User', UserSchema)
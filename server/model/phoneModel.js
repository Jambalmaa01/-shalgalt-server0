const mongoose=require('mongoose')
// const {Schema}=mongoose
const Schema=mongoose.Schema
 
const PhoneSchema = Schema({
    Name:{
        type:String,
        trim:true,
        required:true,
    },
    phoneNumber:{
        type:String,
        trim:true,
        required:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    classId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Class'
    },
    // userID:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //    }
})
module.exports=mongoose.model('Phone', PhoneSchema)
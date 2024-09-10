const PhoneSchema= require('../model/phoneModel')
const asyncHandler=require('../middlewares/asyncHandler')

exports.createPhone=asyncHandler(async(req,res)=>{
    const {Name, phoneNumber, userId, classId}=req.body
    const newPhone =await PhoneSchema.create({        
        Name,
        phoneNumber,
        userId,
        classId
    })
    res.status(200).json({
        success:true,
        data:newPhone
    })
})


exports.getPhone =asyncHandler(async(req, res)=>{
    const allPhone=await PhoneSchema.find()
    res.status(200).json({
        success:true,
        data:allPhone
    })
})

exports.deletePhone =asyncHandler(async(req,res)=>{
    const phonei= req.params.id
    const Phonedel=await PhoneSchema.findByIdAndDelete(phonei)
    res.status(200).json({
        Phonedel
    })
})

exports.editPhone =asyncHandler(async(req, res)=>{
    try{
    const PId =req.params.id
    const phoneId=await PhoneSchema.findByIdAndUpdate(PId, req.body, {new:true})
    if(!phoneId){
        res.status(404).json({success:false, message:'oldsongvv'})
    }
    res.status(200).json({success:true, data:phoneId})

   }catch(error){
    console.error(error)
    res.status(500).json({
        success:false,
        error:'amjiltgvv'
    })
   }
})
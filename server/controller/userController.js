const UserSchema=require('../model/userModel')
const asyncHandler=require('../middlewares/asyncHandler')


exports.login=asyncHandler(async(req, res)=>{
    console.log('invite', req.body)
       const {name, password, role}=req.body
       const user= await UserSchema.create({
        name:name,
        password:password
       })
       res.status(200).send({
        success:'amjilttai',
        user
       })
})
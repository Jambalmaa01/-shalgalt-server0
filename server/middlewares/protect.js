const asyncHandler=require('./asyncHandler')
const jwt=require("jsonwebtoken")
const User=require('../model/authModel')
const MyError=require('../utils/myError')

exports.protect=asyncHandler(async(req, res, next)=>{
  console.log('req.headers.authorization', req.headers.authorization)
  if(!req.headers.authorization)
  throw new MyError("Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ оо", 401);
const token=req.headers.authorization.split(" ")[1];
    if(!token) throw new MyError(" Token байхгүй байна", 401)
const tokenObj=jwt.verify(token, process.env.JWT_SECRET);
    req.userId=tokenObj.id;
    req.role=tokenObj.role
    next();
})
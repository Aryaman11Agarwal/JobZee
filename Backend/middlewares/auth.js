const catchAysncError = require('./catchAsyncError.js');
const {ErrorHandler} = require('./error.js');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');


const isAuthorised=catchAysncError(async (req,res,next)=>{
    const {token}=req.cookies;
      // console.log(token);
    if(!token){
        return next(new ErrorHandler("user not authorised",404));
    }

    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await userModel.findById(decoded.id);
next();


});

module.exports=isAuthorised;
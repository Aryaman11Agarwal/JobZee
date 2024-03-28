const catchAysncError = require('./catchAsyncError.js');
const {ErrorHandler} = require('./error.js');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel.js');


const isAuthorised=catchAysncError(async (req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("user not authorised",404));
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user=await user.findById(decoded.id);

    next();


});

module.exports=isAuthorised;
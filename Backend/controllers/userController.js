const catchAsyncError = require('../middlewares/catchAsyncError.js');
const { ErrorHandler } = require('../middlewares/error.js');
const userModel = require('../models/userModel.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register=catchAsyncError(async (req,res,next)=>{
    const {name,email,phone,role,password}=req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill full registration form"));
    }

    const isEmail= await userModel.findOne({email:email});

    if(isEmail){
        return next(new ErrorHandler("Email already exists"));
    }

    const user=await userModel.create({
        name,
        email,
        phone,
        role,
        password
    });

    jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,(err,token)=>{
        if(!err){
          const options={
            maxAge :process.env.COOKIE_EXPIRE*24*60*60*1000,
            httpOnly:true
          }
        
          res.status(200).cookie("token",token,options).send({
            success:true,
            user,
            message:"user created successfully",
            token:token
          })
        }
    
        else{
            console.log("in error");
           return next(err);
        }
    
      })
});


const login=catchAsyncError(async (req,res,next)=>{
   const {email,password,role}=req.body;
//    console.log(email);
//    console.log(password);
//    console.log(role);

   if(!email||!password||!role){
    return next(new ErrorHandler("Please provide email ,password and role"),404);
   }

   const user=await userModel.findOne({email:email});

  
   
   if(!user){
    return next(new ErrorHandler("Invalid Email or password"),404);
   }

   bcrypt.compare(password,user.password, (err, isMatch) => { 
   if(!err){
     if(isMatch){
        if(user.role!==role){
          return  next(new ErrorHandler("user with this role not found"));
        }

        jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,(err,token)=>{
            if(!err){
              const options={
                maxAge :process.env.COOKIE_EXPIRE*24*60*60*1000,
                httpOnly:true
              }
            
              res.status(200).cookie("token",token,options).send({
                success:true,
                user,
                message:"user created successfully",
                token:token
              })
            }
        
            else{
                
               return next(err);
            }
        
          })
     }
     else{
        return next(new ErrorHandler("Invalid Email or password"),404);
     }
   }
   else{
    next(err);
   }
  // 
})

});


const logout=catchAsyncError(async (req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"User logged out sucessfully"
    })
});


const getUser=catchAsyncError((req,res,next)=>{
  const user=req.user;

  res.status(200).json({
    success:true,
    user,
  })
})


module.exports={register,login,logout,getUser}
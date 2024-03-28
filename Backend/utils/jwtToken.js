const sendToken=(user ,statusCode,res,message)=>{
  const token=user.getJWTToken();
  const options={
    maxAge :process.env.COOKIE_EXPIRE*24*60*60*1000,
    httpOnly:true
  }

  res.status(statusCode).cookie("token",token,options).json({
    success:true,
    user,
    message,
    token
  })
}

module.exports=sendToken;
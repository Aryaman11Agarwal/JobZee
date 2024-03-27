const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        minLength: [3,"Minimum length of 3 is required"],
        maxLength: [30,"Maximum length of 30 is allowed"],
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"please provide you email"],
        validate:[validator.isEmail,"please provide a valid email"]
    },
    phone:{
        type:number,
        required:[true,"Please provide a phone number"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        enum:["Job Seeker","Employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

userSchema.pre('save',async (next)=>{
 if(!this.isModified('password'))
 next();
this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword=async (enteredPassword)=>{
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getJWTToken=()=>{
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
};


const userModel=mongoose.model("users",userSchema);

module.exports=userModel;


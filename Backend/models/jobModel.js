const mongoose = require('mongoose');

const jobSchema=mongoose.Schema({
    title:{
        type:String,
        requires:[true,"Please provide job title"],
        minLength:[3,"Jbo title must contain at least 3 characters"],
        maxLength:[50,'Job title can hava maximum of 50 characters'],
    },
    description:{
        type:String,
        required:[true,"Please provide job description"],
        minLength:[50,"Job Description must contain at least 50 characters"],
        maxLength:[350,'Job Description can hava maximum of 350 characters'],
    },
    category:{
        type:String,
        required:[true,"Job category is required"]
    },
    country:{
        type:String,
        required:[true,"Job country is required"]
    },
    city:{
        type:String,
        required:[true,"Job country is required"]
    },

    location:{
        type:String,
        required:[true,"Job country is required"],
        minLength:[50,'Job location must contain atleast 50 characters']
    },
    fixedSalary:{
        type:Number,
        minLength:4,
        maxLength:9
    },
    salaryFrom:{
        type:Number,
        minLength:4,
        maxLength:9
    },
    SalaryTo:{
        type:Number,
        minLength:4,
        maxLength:9
    },
    expired:{
        type:Boolean,
        default:false,

    },
    jobPostedOn:{
        type:Date,
        default: Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:true
    }
})

const jobModel=mongoose.model("jobs",jobSchema);

module.exports=jobModel;
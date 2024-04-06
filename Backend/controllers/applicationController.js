const catchAsyncError = require('../middlewares/catchAsyncError');
const {ErrorHandler} = require('../middlewares/error');
const  applicationModel= require('../models/applicationModel.js');
const cloudinary = require('cloudinary');
const jobModel = require('../models/jobModel.js');


const employerGetAllAplications=catchAsyncError(async (req,res,next)=>{
    const user=req.user;
    const role=user.role;

    if(role==='Job Seeker'){
        return next(new ErrorHandler("You are not allowed to acces this resource"));
    }
    const userId=user._id;

    const applications=await  applicationModel.find({'employerID.user':userId});

    res.status(200).json({
        success:true,
        applications
    })
    



})


const jobseekerGetAllAplications=catchAsyncError(async (req,res,next)=>{
    const user=req.user;
    const role=user.role;

    if(role==='Employer'){
        return next(new ErrorHandler("You are not allowed to acces this resource"));
    }
    const userId=user._id;

    const applications=await  applicationModel.find({'applicantID.user':userId});

    res.status(200).json({
        success:true,
        applications
    })
    



})


const jobseekerDeleteApplication=catchAsyncError(async (req,res,next)=>{
    const user=req.user
    const role=user.role
    const jobId=req.params.id;

    if(role==='Employer'){
        return next(new ErrorHandler("You are not allowed to access this resource"));
    }

     const application=await applicationModel.findById(jobId)

     if(!application)
     return next(new ErrorHandler("Application not found"));

     await application.deleteOne();

     res.status(200).json({
        success:true,
        message:"application deleted successfully"
     })





})



const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Resume File Required!", 400));
    }
  
    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
      return next(
        new ErrorHandler("Invalid file type. Please upload a PNG file/jpg/webp file", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );
  
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
    }
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };
    if (!jobId) {
      return next(new ErrorHandler("Job not found!", 404));
    }
    const jobDetails = await jobModel.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 404));
    }
  
    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };
    if (
      !name ||
      !email ||
      !coverLetter ||
      !phone ||
      !address ||
      !applicantID ||
      !employerID ||
      !resume
    ) {
      return next(new ErrorHandler("Please fill all fields.", 400));
    }
    const application = await applicationModel.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
    
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  });

module.exports={employerGetAllAplications,jobseekerGetAllAplications,jobseekerDeleteApplication,postApplication}
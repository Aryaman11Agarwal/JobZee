const catchAsyncError = require("../middlewares/catchAsyncError.js");
const { ErrorHandler } = require("../middlewares/error.js");
const jobModel = require("../models/jobModel.js");

const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await jobModel.find({ expired: false });

  res.status(200).json({
    success: true,
    jobs,
  });
});

const postjob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("You cannot post a job since you are a job seeker", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location)
    return next(new ErrorHandler("Fill all the fields", 400));

  if((!salaryFrom||salaryTo)&&!fixedSalary)
  return next(new ErrorHandler("Please provide either fixed salaty or ranged Salary", 400));

  if(salaryFrom&&salaryTo&&fixedSalary)
  return next(new ErrorHandler("Please provide either fixed salaty or ranged Salary not both", 400));

  if(!fixedSalary&&(salaryFrom>salaryTo))
  return next(new ErrorHandler("Please provide the ranged salary correctly", 400));

  const postedBy=req.user._id;

  const job=await jobModel.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy
  })





res.status(200).json({
    success:true,
    message:"Job posted successfully"
})



});


module.exports = { getAllJobs,postjob };

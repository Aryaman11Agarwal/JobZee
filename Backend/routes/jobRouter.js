const express = require('express');

const {getAllJobs,postjob,getmyJobs,updateJob,deleteJob} = require('../controllers/jobController.js');
const isAuthorised = require('../middlewares/auth.js');



const router=express();


router.get('/getall',getAllJobs)
router.post('/post',isAuthorised,postjob)
router.get('/getmyJobs',isAuthorised,getmyJobs);
router.post('/updateJob/:id',isAuthorised,updateJob)
router.get('/deleteJob/:id',isAuthorised,deleteJob)

module.exports=router;
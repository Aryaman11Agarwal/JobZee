const express = require('express');

const {getAllJobs,postjob} = require('../controllers/jobController.js');
const isAuthorised = require('../middlewares/auth.js');



const router=express();


router.get('/getall',getAllJobs)
router.post('/post',isAuthorised,postjob)
module.exports=router;
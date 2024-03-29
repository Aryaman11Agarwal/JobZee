const express = require('express');

const {employerGetAllAplications,jobseekerDeleteApplication,jobseekerGetAllAplications,postApplication} = require('../controllers/applicationController.js');
const isAuthorised = require('../middlewares/auth.js');

const router=express();

router.get('/employer/getall',isAuthorised,employerGetAllAplications),
router.get('/jobseeker/getall',isAuthorised,jobseekerGetAllAplications)
router.delete('/delete/:id',isAuthorised,jobseekerDeleteApplication),
router.post('/post',isAuthorised,postApplication)

module.exports=router;
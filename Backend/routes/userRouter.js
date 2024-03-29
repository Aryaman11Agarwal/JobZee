const express = require('express');
const isAuthorised = require('../middlewares/auth.js');

const router=express();

const  {register,login,logout,getUser}= require('../controllers/userController.js');

router.post('/register',register);
router.post('/login',login);
router.get('/logout',isAuthorised,logout)
router.get('/getUser',isAuthorised,getUser);

module.exports=router;
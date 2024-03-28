const express = require('express');
const isAuthorised = require('../middlewares/auth.js');

const router=express();

const  {register,login,logout}= require('../controllers/userController.js');

router.post('/register',register);
router.post('/login',login);
router.get('/logout',isAuthorised,logout)

module.exports=router;
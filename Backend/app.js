const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/userRouter.js');
const applicationRouter = require('./routes/userRouter.js');
const jobRouter = require('./routes/jobRouter.js');

const app =express();
dotenv.config({path:"./config/config.env"});

app.use(cors({
origin: [process.env.FRONTEND_URL],
methods:['GET','PUT','POST','DELETE'],
credentials:true
}));




app.use(
    fileUpload(
        {
            useTempFiles:true,
            tempFileDir:"/tmp/",
        }
    )
)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/v1/user',userRouter);
app.use('/api/v1/application',applicationRouter);
app.use('/api/v1/job',jobRouter);

module.exports=app;
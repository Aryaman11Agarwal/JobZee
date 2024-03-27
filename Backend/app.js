const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

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

module.exports=app;
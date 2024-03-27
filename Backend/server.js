const app = require('./app.js');
const cloudinary = require('cloudinary');


app.listen(process.env.PORT,()=>{
    console.log(`Server is up and listening on port ${process.env.PORT}`);
})
const mongoose = require('mongoose');

const dbConnection=()=>{
    const dburl=process.env.DATABASE_URL;
    mongoose.connect(dburl)
    .then(()=>{
        console.log("databse connected");
    })
    .catch(e=>console.log(e));
}

module.exports=dbConnection;
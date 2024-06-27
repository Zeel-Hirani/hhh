const mongoose = require('mongoose')
const colors = require("colors");
const connectDb = async()=>{
    try{
       
        await mongoose.connect(process.env.MONGO_URL);
         console.log(`connected to Database ${mongoose.connection.host}`.bgWhite);
    }catch(error){
        console.log('Db error',error);
    }
}


module.exports = connectDb;

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:[true,'user name is required']
    },
    email:{
        type:String,
        require:[true,'email is required'],
        unique:true,
    },
    password:{
        type:String,
        require:[true,'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        require:[true,'phone number is required']
    },
    usertype:{
        type:String,
        require:[true,'user type is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
    },
    answer:{
        type:String,
        require:[true,"Asnwer is require"]
    }
},{timestamps:true})

module.exports = mongoose.model('user',userSchema)
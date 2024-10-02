const mongoose = require('mongoose');
const ProdUserSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    userId:
    {
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        
    },
    Password:{
        type:String,
        required:true
    },
    Products:[
        {
            Photo1:
            {
                type:String,
                required:true
            },
            Photo2:
            {
                type:String,
                required:true,
            },
            Photo3:
            {
                type:String,
                required:true
            },
            Photo4:
            {
                type:String,
                required:true
            },
           Stock:{
            type:Number,
            required:true
           },
            Price:
            {
                type:Number,
                required:true
            },
            PrevPrice:
            {
                type:Number,
                required:true
            },
            Description:
            {
                type:String,
                required:true
            },
        }
    ]


})
const ProdUsers = mongoose.model("ProdUsers",ProdUserSchema)

module.exports= ProdUsers;
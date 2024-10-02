const mongoose = require('mongoose');
const connection = ()=>
    {
        const db = "mongodb+srv://rahul876j:ecom123@cluster0.6xdwfnt.mongodb.net/=true&w=majority&appName=Cluster0"
        mongoose.connect(db);
        console.log("Mongo DB is connected");
    }
module.exports = {connection}
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async(req,res)=>
    {
        const {userId,Email,Password,UserName} = req.body
        const isUser = await User.findOne({ Email });
        if (isUser) {
          return res.status(403).json({
            msg: "This Email Id is already exists",
          });
        }
    
        const hashedPassword = await bcrypt.hash(Password, 10);
    
        const newUser = new User({
          UserName,
          userId,
          Email,
          Password: hashedPassword,
        });
    
        await newUser.save();
    
        return res.status(201).json(newUser);
    }
const login = async(req,res)=>
    {
        try
        {
            
        const {userId,Email,Password} = req.body;
        const user = await User.findOne({userId})
        const isUser = await  User.findOne({Email})
            if(!user)
            {
                return res.status(404).json({msg:"Invalid User Id"});
            }
            if(!isUser)
            {
                return res.status(404).json({msg:"Wrong Email Id"})
            }
            const check = await bcrypt.compare(Password,isUser.Password);
            
        const token = jwt.sign({
            id:isUser._id
        },"ecomm123")
        console.log(token);
        
        const loggedUser = isUser.toObject();
        delete loggedUser.Password;
        const id = isUser._id;
        console.log(id)
        console.log(userId);
        return res.status(201).send({token,id,userId});
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({msg:err})
        }
    }
module.exports = {login,register}

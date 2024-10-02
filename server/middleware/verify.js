const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const verifyToken = (req,res,next)=>
    {
        try
        {
                let token = req.header("Authorization")
                if(!token)
                    {
                        return res.status(404).json({msg:"Token not found"});
                    }
                    console.log(token)
                    token = token.split(" ")[1];
                    const verify = jwt.verify(token,"ecomm123");
                    req.user = verify;
                    next();
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({msg:err})
        }

    }

module.exports = {verifyToken}
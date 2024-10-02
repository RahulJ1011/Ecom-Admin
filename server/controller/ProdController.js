const User = require('../models/user');



const AddProduct = async(req,res)=>
    {
        try
        {
            const {Photo1,Photo2,Photo3,Photo4,Description,PrevPrice,Price,userId,Stock,id} = req.body;
            const isUser = await User.findOne({userId})
            if(!userId)
                {
                    return res.status(404).json({msg:"User not found"})
                }
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        $push: {
                            Products: {
                                Photo1: Photo1,
                                Photo2: Photo2,
                                Photo3: Photo3,
                                Photo4: Photo4,
                                Description: Description,
                                PrevPrice: PrevPrice,
                                Price: Price,
                                Stock: Stock
                            }
                        }
                    },
                    { new: true }
                );
        return res.status(201).json({msg:" Product added sucessfully"})
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json({msg:err})
        }
    }
    const MyProducts = async(req,res)=>
        {
            try
            {
                const {userId} = req.params;
                const isUser = await User.findOne({userId:userId});
                if(!isUser)
                    {
                        return res.status(404).json({msg:"User not found"});
                    }
                const myprods = isUser.Products;
                return res.status(201).json(myprods)
            }
            catch(err)
            {
                console.log(err);
                return res.status(500).json({msg:err});
            }
        }
    const EmptyProds = async(req,res)=>
        {
            try
            {
                const {userId} = req.body;
                const user = await User.findOne({userId});
                const emStocks = user.Products.some((stock)=> stock.Stock === 0);
                return res.status(201).json(emStocks)
            }
            catch(err)
            {
                console.log(err);
                return res.status(500).json({msg:err})
            }
        }
module.exports = {AddProduct,MyProducts,EmptyProds};

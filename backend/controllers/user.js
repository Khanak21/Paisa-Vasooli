import User from "../models/user.js"

export const addStock = async(req,res)=>{
    const stock = req.body.input
    const userId = req.params.userId
    console.log(userId,stock)
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { stocks: stock } },
            { new: true }
        );

        res.status(200).json({ message: 'Stock added successfully', user });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const getStocks = async(req,res)=>{
    const userId = req.params.userId
    try{
        const user = await User.findById(userId);
        const val=user.stocks;

        res.status(200).json({ message: 'Stocks retrieved successfully', val });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
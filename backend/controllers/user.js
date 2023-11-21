import User from "../models/user.js"

export const addStock = async(req,res)=>{
    const stock = req.body
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
export const getUrls = async(req,res)=>{
    const userId = req.params.userId
    try{
        const user = await User.findById(userId);
        const files=user.files;

        res.status(200).json({ message: 'Stocks retrieved successfully', files });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const addUrl = async(req,res)=>{
    const {url,fileName} = req.body
    const userId = req.params.userId
    console.log(userId,url)
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { files: {fileName:fileName,url:url} } },
            { new: true }
        );

        res.status(200).json({ message: 'file added successfully', user });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getInbox = async(req,res)=>{
    const {userId} = req.params
    try{
        const user=await User.findById(userId)
        res.json({inbox:user.inbox})
    }catch(err){
        res.json("user not found")
    }
}

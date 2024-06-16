import User from "../models/user.js"

export const addStock = async (req, res) => {
    const stock = req.body;
    const userId = req.params.userId;
    console.log(userId, stock);

    try {
        const user = await User.findById(userId);

        // Check if the stock already exists
        const stockExists = user.stocks.some(existingStock => existingStock.input === stock.input);

        if (stockExists) {
            return res.status(400).json({ message: 'Stock already exists' });
        }

        // Add the stock if it does not exist
        user.stocks.push(stock);
        await user.save();

        res.status(200).json({ message: 'Stock added successfully', user });

    } catch (err) {
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

export const deleteStock = async (req, res) => {
    try {
        const { userId } = req.params; 
        const stockId = req.body.stockId; 

        console.log("userId",userId,"stock Id",stockId)
        if (!stockId) {
            return res.status(400).json({ message: "Stock ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Can't find the user of given ID" });
        }

        console.log("User stocks", user.stocks);

        // Filter out the stock to be deleted
        const updatedStocks = user.stocks.filter(stock => stock.input !== stockId);
        user.stocks = updatedStocks;

        const updatedUser = await user.save();
        console.log("Updated stocks", user.stocks);

        res.status(200).json({
            user: updatedUser,
            stocks: updatedUser.stocks
        });
    } catch (error) {
        console.log("Error while deleting the stock", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const delUrl=async (req, res) => {
    try {
        const {url} = req.body
        const {userId}=req.params
        console.log(userId)
        const user=await User.findById(userId)
        console.log("Url frontend",url)
        const updatedFiles=user.files.filter((file)=>file.url!==url)
        console.log("updatedFiles",updatedFiles)
        user.files=updatedFiles

        const k=await user.save()
        console.log(updatedFiles) 

        if(!k)
            {
                res.status(502).json({message:"Can't save the user "})
            }
    
        console.log('File successfully deleted.');
        return res.send({ message: 'file deleted from firebase storage' ,files:user.files});
    } catch (error) {
        console.error("Error while deleting the file:", error);
        return res.status(400).send(error.message);
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
export const addImg = async(req,res)=>{
    const {url} = req.body
    const userId = req.params.userId
    console.log(userId,url)
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { image: url } },
            { new: true }
        );
        res.status(200).json({ message: 'image added successfully', user });

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

export const addBadge=async(req,res)=>{
    const image = req.body.img
    const userId = req.params.id
    console.log(userId,image)
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { badges: image } },
            { new: true } 
        );

        res.status(200).json({ user });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getBadges=async(req,res)=>{
    const userId = req.params.id
    console.log(userId);
    try{
        const user = await User.findById(userId)
        const badges = user.badges;
        res.status(200).json({ badges });
    }catch(err){
        console.error(err);
    }
}
const transactionSchema = require("./models/transaction")

const addTransaction = async(req,res)=>{
    const {type,amount,category,desc,date,userId}=req.body

    const transaction = transactionSchema({
        userId,
        type,
        amount,
        category,
        desc,
        date
    })

    try{
        if(!type || !amount || !category || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        await transaction.save()
        res.status(200).json({message:'transaction added'})

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
    console.log(transaction)

}

const getTransactions=async(req,res)=>{
    const {userId}= req.body;
    try{
        const trans = await transactionSchema.find({userId:userId})
    }catch(err){
        res.json({message:"No transactions found"})
    }

}

const editTransaction=async(req,res)=>{

}

const deleteTransaction=async(req,res)=>{

}

const getTransactionsByCategory=async(req,res)=>{
    const {id,category}= req.body;
    try{
        const trans = await transactionSchema.find({userId:id,category:category})
    }catch(err){
        res.json({message:"No transactions by given category found"})
    }
}

const getTransactionsByDate=async(req,res)=>{
    const {id,date}= req.body;
    try{
        const trans = await transactionSchema.find({userId:id,date:date})
    }catch(err){
        res.json({message:"No transactions on given date found"})
    }
}

const getTransactionsByMonth=async(req,res)=>{
    const {id,category}= req.body;
    try{
        const trans = await transactionSchema.find({userId:id,category:category})
    }catch(err){
        res.json({message:"No transactions by given month found"})
    }
}

const getTransactionsByYear=async(req,res)=>{
    const {id,category}= req.body;
    try{
        const trans = await transactionSchema.find({userId:id,category:category})
    }catch(err){
        res.json({message:"No transactions by given year found"})
    }
}

const getTotalStats=async(req,res)=>{
    const {id} = req.body;
    try{
        const income = await transactionSchema.find({userId:id,type:income})
        const expense = await transactionSchema.find({userId:id,type:expense})
        const balance = income-expense
        res.json({income,expense,balance})


    }catch(err){
        res.json({message:"No stats found"})
    }
}


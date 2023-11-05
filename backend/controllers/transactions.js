const transaction = require("./models/transaction")
const User = require("./models/user")
export const ErrorMessage = (status,message)=>{
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
  }

const addTransaction = async(req,res)=>{
    const {type,amount,currency,category,desc,date,userId}=req.body

    const transaction = transaction({
        userId,
        type,
        amount,
        currency,
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
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions found"})
    }

}

const editTransaction=async(req,res)=>{
    try{
        const tran = await transaction.findById(req.params.id);
        if(!tran){
            return next(createError(404,"Transaction not found"));
        }
        if(req.User.id===req.user.id){
            const newtran = await transaction.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.json({newtran})
            res.status(200).json("Transaction removed");
        }else{
            next(ErrorMessage(403,"unable to edit this transaction"));
        }
    }catch{
        res.status(200).json("unable to edit transaction");
    }
}

const deleteTransaction=async(req,res)=>{
    try{
        const tran = await transaction.findById(req.params.id);
        if(!tran){
            return next(createError(404,"Transaction not found"));
        }
        if(req.User.id===req.user.id){
            await transaction.findByIdAndRemove(req.params.id);
            res.status(200).json("Transaction removed");
        }else{
            next(ErrorMessage(403,"unable to delete this transaction"));
        }
    }catch{
        res.status(200).json("unable to delete transaction");
    }
}

const getTransactionsByCategory=async(req,res)=>{
    const {userId,category}= req.body;
    try{
        const trans = await transactionSchema.find({userId:userId,category:category})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions by given category found"})
    }
}

const getTransactionsByDate=async(req,res)=>{
    const {userId,date}= req.body;
    try{
        const trans = await transactionSchema.find({userId:userId,date:date})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions on given date found"})
    }
}

const getTransactionsByMonth=async(req,res)=>{
    const {userId,category}= req.body;
    try{
        const trans = await transactionSchema.find({userId:userId,category:category})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions by given month found"})
    }
}

const getTransactionsByYear=async(req,res)=>{
    const {userId,category}= req.body;
    try{
        const trans = await transactionSchema.find({userId:userId,category:category})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions by given year found"})
    }
}

const getTotalStats=async(req,res)=>{
    const {userId} = req.body;
    try{
        const income = await transactionSchema.find({userId:userId,type:income})
        const expense = await transactionSchema.find({userId:userId,type:expense})
        const balance = income-expense
        res.json({income,expense,balance})


    }catch(err){
        res.json({message:"No stats found"})
    }
}


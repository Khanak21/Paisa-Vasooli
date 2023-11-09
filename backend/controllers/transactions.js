import Transaction from "../models/transaction.js";
import User from "../models/user.js"
export const ErrorMessage = (status,message)=>{
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
}

export const addTransaction = async(req,res)=>{
    // const {type,amount,currency,category,desc,date,userId}=req.body
    // console.log(req.body);
    const transaction = Transaction(
        // userId,
        // type,
        // amount,
        // currency,
        // category,
        // desc,
        // date
        req.body.transInput
    )

    try{
        // if(!type || !amount || !category || !date){
        //     return res.status(400).json({message: 'All fields are required!'})
        // }
        await transaction.save()
        res.status(200).json({transaction})

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
    console.log(transaction)

}

export const getTransactions=async(req,res)=>{
    const userId= req.params.userId;
    // console.log(req.params.userId)
    try{
        const trans = await Transaction.find({userId:userId})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions found"})
    }

}


export const editTransaction=async(req,res)=>{
    try{
        const tran = await Transaction.findById(req.params.id);
        if(!tran){
            return next(createError(404,"Transaction not found"));
        }
            const newtran = await Transaction.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            res.json({newtran})
            res.status(200).json("Transaction edited");
    }catch(err){
        res.status(400).json("unable to edit transaction");
    }
}

export const deleteTransaction=async(req,res)=>{
    try{
        const tran = await Transaction.findById(req.params.id);
        if(!tran){
            return next(createError(404,"Transaction not found"));
        }
        if(req.User.id===req.user.id){
            await Transaction.findByIdAndRemove(req.params.id);
            res.status(200).json("Transaction removed");
        }else{
            next(ErrorMessage(403,"unable to delete this transaction"));
        }
    }catch{
        res.status(200).json("unable to delete transaction");
    }
}

export const getTransactionsByCategory=async(req,res)=>{
    const {userId,category}= req.body;//change this
    try{
        const trans = await Transaction.find({userId:userId,category:category})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions by given category found"})
    }
}

export const getTransactionsByDate=async(req,res)=>{
    const {userId,date}= req.body;
    try{
        const trans = await Transaction.find({userId:userId,date:date})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions on given date found"})
    }
}

export const getTransactionsByMonth=async(req,res)=>{
    const {userId,category}= req.body;//change this
    try{
        const trans = await Transaction.find({userId:userId,category:category})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions by given month found"})
    }
}

export const getTransactionsByYear=async(req,res)=>{
    const {userId,category}= req.body;//change this
    try{
        const trans = await Transaction.find({userId:userId,category:category})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions by given year found"})
    }
}
//correct this api first---->
export const getTotalStats=async(req,res)=>{
    const userId = req.params.userId
    console.log("user:",userId)
    try{
         // Calculate total income
         const incomeResult = await Transaction.aggregate([
            {
                $match: {
                    userId: userId,
                    type: 'income'
                }
            },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: '$amount' }
                }
            }
        ]);

        // Calculate total expenses
        const expenseResult = await Transaction.aggregate([
            {
                $match: {
                    userId: userId,
                    type: 'expense'
                }
            },
            {
                $group: {
                    _id: null,
                    totalExpense: { $sum: '$amount' }
                }
            }
        ]);

        const totalIncome = incomeResult.length > 0 ? incomeResult[0].totalIncome : 0;
        const totalExpense = expenseResult.length > 0 ? expenseResult[0].totalExpense : 0;
        const balance = totalIncome - totalExpense;

        res.json({ totalIncome, totalExpense, balance });
        // res.json({incomeResult,expenseResult})
    }catch(err){
        res.json({message:"No stats found"})
    }
}


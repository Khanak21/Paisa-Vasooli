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

// const getTransactions=async(req,res)=>{
//     const id= req.params.id;
//     try{
//         const trans = await 
//     }

// }

const editTransaction=async(req,res)=>{

}

const deleteTransaction=async(req,res)=>{

}

const getTransactionsByCategory=async(req,res)=>{

}

const getTransactionsByDate=async(req,res)=>{

}

const getTransactionsByMonth=async(req,res)=>{

}

const getTransactionsByYear=async(req,res)=>{
     
}

const getTotalStats=async(req,res)=>{
   
}


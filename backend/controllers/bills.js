const billSchema = require("./models/bills")

//controllers for bills and dues
const addBill = async(req,res)=>{
    const {userId,title,amount,currency,toWhom,recurring} =req.body

    const transaction = transactionSchema({
        userId,
        title,
        amount,
        currency,
        toWhom,
        recurring//daily,weekly,monthly,yearly,none

    })

    try{
        if(!userId || !title || !amount || !currency || !toWhom){
            return res.status(400).json({message: 'All fields are required!'})
        }
        await transaction.save()
        res.status(200).json({message:'transaction added'})

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
    console.log(transaction)

}

const getBills = async(req,res)=>{
    const {userId}= req.body;
    try{
        const trans = await billSchema.find({userId:userId})
        res.json({trans})
    }catch(err){
        res.json({message:"No transactions found"})
    }

}

const editBill = async(req,res)=>{
    try{
        const bill = await billSchema.findByIdAndUpdate(req.params.id);
        res.json({message:"bill edited"})
    }catch(err){
        res.json({message:"cannot edit the bill/bill not found"})

    }
}
const deleteBill = async(req,res)=>{
    try{
        const bill = await billSchema.findByIdAndDelete(req.params.id);
        res.json({message:"bill deleted"})
    }catch(err){
        res.json({message:"cannot delete the bill/bill not found"})

    }

}





import  billSchema from "../models/bills.js";

//controllers for bills and dues
export const addBill = async(req,res)=>{
    const {userId,title,amount,currency,toWhom,recurring,dueDate} =req.body

    const bill = billSchema(
        req.body.dueItem
    )

    try{
        // if(!userId || !title || !amount  || !toWhom){
        //     return res.status(400).json({message: 'All fields are required!'})
        // }
        await bill.save()
        res.status(200).json({bill})

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
    console.log(bill)

}

export const getBills = async(req,res)=>{
    const userId= req.params.userId;
    try{
        const bill = await billSchema.find({userId:userId})
        res.json({bill})
    }catch(err){
        res.json({message:"No transactions found"})
    }

}

export const editBill = async(req,res)=>{
    try{
        const bill = await billSchema.findByIdAndUpdate(req.params.id,{$set:req.body.BillInput},{new:true});
        res.json({message:"bill edited"})
    }catch(err){
        res.json({message:"cannot edit the bill/bill not found"})

    }
}
export const deleteBill = async(req,res)=>{
    try{
        const bill = await billSchema.findByIdAndDelete(req.params.id);
        res.json({message:"bill deleted"})
    }catch(err){
        res.json({message:"cannot delete the bill/bill not found"})

    }

}






































































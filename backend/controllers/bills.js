import  billSchema from "../models/bills.js";

//controllers for bills and dues
export const addBill = async(req,res)=>{
    const {userId,title,amount,currency,toWhom,recurring,dueDate} =req.body
    console.log(req.body);
    const bill = billSchema(
        req.body.dueItem
    )
    try{
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
    console.log("mast",req.body.Bill);
    const updateFields = {
        title: req.body.Bill.titleedit,
        dueDate: req.body.Bill.dueDateedit,
        amount: req.body.Bill.amountedit,
        toWhom: req.body.Bill.toWhomedit,
      };
      console.log("badhiya",updateFields)
    try{
        const bill = await billSchema.findByIdAndUpdate(req.params.id,{$set:updateFields},{new:true});
        res.status(200).json(bill)
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






































































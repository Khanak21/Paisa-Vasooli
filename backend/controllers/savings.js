import savingSchema from "../models/savings.js"

export const addSaving = async(req,res)=>{

    console.log(req.body)

    const saving = savingSchema(
        req.body.saving

    )

    try{
        await saving.save()
        res.status(200).json({message:'saving added',saving})

    }catch(err){
        res.status(500).json({message:'Server error'})
    }
    console.log(saving)

}

export const getSavings = async(req,res)=>{
    const userId= req.params.userId;
    console.log("user id is:",req.params.userId)
    try{
        const savings = await savingSchema.find({userId:userId})
        console.log(savings)
        res.json({savings})
    }catch(err){
        res.json({message:"No savings found"})
    }

}

export const editSaving = async(req,res)=>{
    try{
        const saving = await savingSchema.findByIdAndUpdate(req.params.id,{$set:req.body.sav},{new:true});
        res.json({message:"saving edited",saving})
    }catch(err){
        res.json({message:"cannot edit the saving/saving not found"})
        console.log(err)
    }
}
export const deleteSaving = async(req,res)=>{
    try{
        const saving = await savingSchema.findByIdAndDelete(req.params.id);
        res.json({message:"saving deleted",saving})
    }catch(err){
        res.json({message:"cannot delete the saving/saving not found"})
    }
}
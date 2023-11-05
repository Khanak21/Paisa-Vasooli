import mongoose from "mongoose";

const savingSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    targetAmt:{
        type:Number,
        required:true
    },
    currAmt:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:true
    }
},{timestamps: true})

export default mongoose.model("Saving",savingSchema)
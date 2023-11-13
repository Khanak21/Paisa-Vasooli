import mongoose from "mongoose";

const savingSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    targetAmt:{
        type:Number,
    },
    currAmt:{
        type:Number,
    },
    currency:{
        type:String,
    },
    title:{
        type:String
    }
},{timestamps: true})

export default mongoose.model("Saving",savingSchema)
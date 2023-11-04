import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
        trim: true
    },
    category:{
        type:String,
        required:true,
        trim: true
    },
    desc:{
        type:String,
    },
    date:{
        type: Date,
        required: true,
        trim: true
    },
    
},{timestamps: true})

export default mongoose.model("Transaction",transactionSchema)
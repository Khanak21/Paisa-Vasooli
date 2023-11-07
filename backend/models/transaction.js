import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    type:{
        type:String,
    },
    amount:{
        type:Number,
        trim: true
    },
    currency:{
        type:String,
    },
    category:{
        type:String,
        trim: true
    },
    desc:{
        type:String,
    },
    date:{
        type: Date,
        trim: true
    },
    
},{timestamps: true})

export default mongoose.model("Transaction",transactionSchema)
import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
       type:String,
       required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    toWhom:{
        type:String,
        required:true,
    },
    recurring:{
        type:String,
        required:true,
    },


},{timestamps: true})

export default mongoose.model("Bill",billSchema)
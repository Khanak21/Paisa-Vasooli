import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        
        trim:true
    },
    password:{
        type:String,
        
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    stocks:{
        type:[Object],
    }
})

export default mongoose.model("User",userSchema)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
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
    }, 
    files:{
        type:[Object],
    },
    groups:{
        type:[String],
    },
    friends:{
        type:[String]
    },
    sentRequests:{
        type:[String]
    },
    receivedRequests:{
        type:[String]
    },
    inbox:{
        type:[String]
    },
    image:{
        type: String,
        default:null
    },
    badges:{
        type:[String]
    },
    token:{
        type:String
    }
})

export default mongoose.model("User",userSchema)
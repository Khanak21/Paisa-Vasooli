import mongoose from "mongoose"

//Function to connect to database
export const connect =()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        throw err;
    })
}
// module.exports = {connect}
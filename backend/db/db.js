import mongoose from "mongoose"

//Function to connect to database
export const connect =()=>{
    mongoose.connect("mongodb+srv://khanak21:khanak21@cluster0.ladbhox.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        throw err;
    })
}
// module.exports = {connect}
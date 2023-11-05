const mongoose = require('mongoose');

//Function to connect to database
const connect =()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        throw err;
    })
}
module.exports = {connect}
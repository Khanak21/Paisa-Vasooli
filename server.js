const express = require("express") 
const mongoose = require('mongoose');
const { connect } = require('./backend/db/db');
const app = express() 
require("dotenv").config();

//Middlewares
app.use(express.urlencoded({extended:true}))

app.listen(3000, () => { 
    connect()
    console.log("Server is Running") 
}) 
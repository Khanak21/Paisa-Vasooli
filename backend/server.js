import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { Server } from "socket.io";
import {connect} from "./db/db.js"
import http from 'http'
// import userRoutes from './routes/User.js';
// import{ signup, signin } from './backend/controllers/auth.js';
import transroutes from './routes/transactions.js'
import authroutes from './routes/auth.js';
import savingroutes from './routes/savings.js';
import billsRoutes from './routes/bills.js';
import mailroutes from './routes/sendEmail.js'
import userroutes from './routes/user.js';
import grouproutes from './routes/groups.js'
import friendroutes from './routes/friends.js'


import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import cors from "cors";
// const server = http.createServer();
// const io = new Server(server);
const app = express();
dotenv.config();

//Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/bills",billsRoutes)
app.use("/api/transactions",transroutes)
app.use("/api/savings",savingroutes)  
app.use("/api/auth",authroutes)
app.use("/api/mail",mailroutes) 
app.use("/api/user",userroutes)  
app.use("/api/group",grouproutes)
app.use("/api/friend",friendroutes)


// app.use("/api",signinwithgoogle)
// app.use("/api/auth/",signin)

app.use((err,req,res,next)=>{
    const status = err.status||500;
    const message = err.message||"errorrrr";
    console.log(err);
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

// io.on('connection', (socket) => {
//     console.log('A user connected');
  
//     // Listen for comments from clients
//     socket.on('comment', (data) => {
//       // Broadcast the comment to all connected clients
//       io.emit('comment', data);
//     });
  
//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });
  

//server listens on port 3001
const PORT=process.env.PORT||3001
app.listen(PORT,()=>{
    //connecting to database
    connect()
    //connecting to server
    console.log("connected");
})
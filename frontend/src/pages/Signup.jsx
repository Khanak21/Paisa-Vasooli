import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './SignUp.css'
import axios from "axios"

function Signup() {

  const [password,setPassword]=useState("")
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [confirmpass,setConformpass]=useState("")
  const [entries,setEntries]=useState([])
  const [isPass,isPassValid]=useState(false)
  const [isUsername,isUsernameValid]=useState(false)


  const handlePasswordChange = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
     if(newPassword.length <8)
     {
      setPassword(false);
     }
     
    setPassword(newPassword);
    isPassValid(newPassword.length >= 8);
  };

  const handleUsernameChange = (event) => {
    event.preventDefault();
    const newUsername = event.target.value;
    setUsername(newUsername);
    isUsernameValid(newUsername.length >= 5);
  };
  
  const confirm=(event)=>{
    event.preventDefault();
    const k=event.target.value
    setConformpass(k)
  }

  React.useEffect(()=>{
    // axios.post('')
  })

  const submitFunction = (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    if (isPass && isUsername && confirmpass===password) {
      const Entry = { username: username, password: password, email: email };
      setEntries([entries, Entry]);
      const reg =async()=>{
        try{
          const res = await axios.post("http://localhost:3001/api/auth/signup",{username,password,email}).catch(function(err){
          console.log(err)})
          console.log(res.data);
        }catch(err){
            console.log(err);
        }
      }
      reg();
      console.log(Entry);
      // Handle form submission logic here
      //making the credentials empty after submitting
      setEmail("");
      setPassword("")
      setUsername("")
      setConformpass("")
      // alert("Logged in successfully")
    }
    else {
      if(confirmpass!== password)
      {
        alert("Password and confirmed pass didn't match")
      } 
      else
      alert("Invalid username or password. Please check the requirements.");

    }
  };
  
 

  return (
    <form action="" onSubmit={submitFunction}>
      <div className="super-container">
    <div className="container">

          <div className="title">
            Sign Up
          </div>

          <div className="content">
         
            <div className="user-details">

              <div className="input-box">
                <label htmlFor="uname">username</label>
                <input
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  name="uname"
                  onChange={handleUsernameChange}
                  required
                />
              </div>

              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-box">
                <label htmlFor="psw">Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                  name="psw"
                  required
                />
              </div>

              <div className="input-box">
                <label htmlFor="uname">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  name="password"
                  onChange={confirm}
                  required
                />
              </div>

            </div>

            <div className="btn">
    
            <div 
            className="button"
            value="Login"
            >
              <Link to="/login">
            Go_Back_To_Login
            </Link>
          
            </div>

            <div 
            className="button"
            value="Submit"
            onClick={submitFunction}
            >
              Submit
            </div>

            </div>
            
            <div className="forgotPass">
              <span>forgot password ? <a href="">Click here !</a></span>
            </div>
        </div>
      </div>
      </div>
        </form>
  )
}

export default Signup

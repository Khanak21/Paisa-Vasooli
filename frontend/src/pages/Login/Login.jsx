import React, { useState } from "react";
import "./Login.css";
import {Link} from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({user,setUser}) {
  const navigate = useNavigate()

  //hooks to handle the changing states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [allEntry, setAllEntry] = useState([]);
  // const [currentView,setView]=useState("Login")
  // state to validate the email
  const [validEmail,setValidemail]=useState(false)

  //variable to hold the regular expression to check  correct email
  const emailValidation= (email) => {  

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };


  const handlePasswordChange = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
    setPassword(newPassword);
    // setIsPasswordValid(newPassword.length >= 8);
  };

  const handleUsernameChange = (event) => {
    event.preventDefault();
    const newUsername = event.target.value;
    setUsername(newUsername);
    // setIsUsernameValid(newUsername.length >= 5);
  };

  const handleEmail=(event)=>{
     const k=event.target.value;
     setEmail(k);
    //  setValidemail(emailValidation(k));

  }
  
  
  const submitFunction = (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    // if (isPasswordValid && isUsernameValid) {
      const Entry = { username: username, password: password, email: email };
      // setAllEntry([allEntry, Entry]);
      // console.log(allEntry);
      // Handle form submission logic here
      const logi =async()=>{
        try{
          const res = await axios.post("http://localhost:3001/api/auth/signin",{username,email,password})
          console.log(res.data);
          setUser(res.data)
          navigate('/dashboard')
          // setUser(res.data).then(console.log("userdata"+user))
        }catch(err){
            console.log(err);
        }
      }
      logi();
      // setUserData("sd");
      // console.log(userData);
      //making the credentials empty after submitting
      setEmail("");
      setPassword("")
      setUsername("")
      alert("Logged in successfully")
    
    // } else {
      // alert("Invalid username or password. Please check the requirements.");

    // }
  };
  

   
  return (

    <form onSubmit={submitFunction}>
      <div className="super-container">
      <div className="container-login">

        <div className="title-login">
          Login
        </div>

        <div className="content">
          <div className="user-details">
            <div className="input-box">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                name="username"
                onChange={handleUsernameChange}
                className="input-login"
                required
              />
            </div>
            {/*<div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleEmail}
                className="input-login"
                required
              />
              { {(!validEmail && email!=="" )? <p style={{color:'red'}}>Invalid Email address</p>:null} }
            </div>*/}
            <div className="input-box">
              <label htmlFor="psw">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="input-login"
                required
              />
            </div>
          </div>

          <div className="btn">

            <div 
            className="button"
            onClick={submitFunction}
            >
           Login 
            </div>   
        
          </div>
          <div className="forgotPass">
           <div>Not having any account? </div>
              <div> <Link to="/signup">
                Sign up
            </Link></div>
            </div>
        </div>
        </div>
      </div>
    </form>
  );
}

export default Login;

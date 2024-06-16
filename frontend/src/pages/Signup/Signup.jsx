import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './SignUp.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {auth,provider} from "../firebase.js"
import {signInWithPopup} from "firebase/auth"
import GoogleButton from 'react-google-button'

function Signup({user,setUser}) 
{
  const navigate = useNavigate()

  const [password,setPassword]=useState("")
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [confirmpass,setConformpass]=useState("")
  const [entries,setEntries]=useState([])
  const [isPass,isPassValid]=useState(false)
  const [isUsername,isUsernameValid]=useState(false)

//  -------------- function to handle password change ----------------------- 
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
  
  const handleEmail=(event)=>{
    const k=event.target.value;
    setEmail(k);
 }

//  -------------------- function to handle the username change ------------------ 
  const handleUsernameChange = (event) => {
    event.preventDefault();
    const newUsername = event.target.value;
    setUsername(newUsername);
    isUsernameValid(newUsername.length >= 5);
  };
  // --------------------------- function to check confirm ------------------ 
  const confirm=(event)=>{
    event.preventDefault();
    const k=event.target.value
    setConformpass(k)
  }

  const emptyConfirmpass=()=>{
   
    setConformpass("");
  }


  //Google OAuth function
  const googlelogin = (req,res)=>{

    signInWithPopup(auth,provider).then((result)=>{
      console.log(result);
      axios
            .post("http://localhost:3001/api/auth/google", {
              username: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
            })
            .then((res) => {
              console.log(res.data)
              setUser(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
              navigate("/dashboard")
            });
    }).catch((err)=>{console.log(err)})
  }

  // -------------------- function to handle submit ----------------------- 
  const submitFunction = async (event) => {
    event.preventDefault();
  
    if (isPass && isUsername && confirmpass === password) {
      const Entry = { username: username, password: password, email: email };
      setEntries([entries, Entry]);
  
      try {
        const res = await axios.post("http://localhost:3001/api/auth/signup", {
          username,
          email,
          password,
        });
  
        console.log(res.data);
        setUser(res.data.newUser);
        console.log(user);
        localStorage.setItem('user', JSON.stringify(res.data.newUser))
        navigate('/dashboard');

        // Making the credentials empty after submitting
        setEmail("");
        setPassword("");
        setUsername("");
        emptyConfirmpass();
        console.log(confirmpass);
        alert("Logged in successfully");
      } catch (err) {
        if (err.response && err.response.status === 400) {
          alert("Username already exists. Please choose a different username.");
        } else {
          console.log(err);
        }
      }
    } else {
      if (confirmpass !== password) {
        alert("Password and confirmed pass didn't match");
      } else {
        alert("Invalid username or password. Make sure username is >= 5 characters and password is >= 8 characters");
      }
    }
  };
  
  
  return (
    <form action="" onSubmit={submitFunction}>
      <div className="super-container">
    <div className="container-signup">

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
                  className="input-signup"
                  required
                />
              </div>

              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="input-signup"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              {console.log(email)}
              </div>

              <div className="input-box">
                <label htmlFor="psw">Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  className="input-signup"
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
                  value={confirmpass}
                  name="password"
                  onChange={confirm}
                  className="input-signup"
                  required
                />
              </div>

            </div>

            <div className="btn-signup">
            <div 
            className="button"
            value="Submit"
            onClick={submitFunction}
            >
              Submit

              {/* ----------------- signup with google -----------------------  */}
            </div>
            <GoogleButton  onClick={googlelogin}/>  
            </div>
            
            <div className="forgotPass">
           <div>Already have an account? </div>
              <div> <Link to="/login">
                Login
            </Link></div>
            </div>
        </div>
      </div>
      </div>
        </form>
  )
}

export default Signup
import React, { useState } from "react";
import "./Login.css";
import {Link} from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {auth,provider} from "../firebase.js"
import {signInWithPopup} from "firebase/auth"
import GoogleButton from 'react-google-button'

function Login({user,setUser}) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [allEntry, setAllEntry] = useState([]);
  const [validEmail,setValidemail]=useState(false)
  const emailValidation= (email) => {  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  //function to handle input
  const handlePasswordChange = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(newPassword.length >= 8);
  };

  const handleUsernameChange = (event) => {
    event.preventDefault();
    const newUsername = event.target.value;
    setUsername(newUsername);
    setIsUsernameValid(newUsername.length >= 5);
  };

  const handleEmail=(event)=>{
     const k=event.target.value;
     setEmail(k);

  }
  

  const submitFunction = (event) => {
    event.preventDefault(); 
      const Entry = { username: username, password: password, email: email };
      setAllEntry([allEntry, Entry]);
      
      // Handle form submission logic here
      const Logi =async()=>{
        try{
          const res = await axios.post("http://localhost:3001/api/auth/signin",{username,email,password})
          console.log("response data:",res.data);
          setUser(res.data)
          // store the user in localStorage
          localStorage.setItem('user', JSON.stringify(res.data))
          navigate('/dashboard')
        }catch(err){
            console.log(err);
        }
      }
      Logi()
      setEmail("");
      setPassword("")
      setUsername("")
  };
  
  const googlesekar = (req,res)=>{
    signInWithPopup(auth,provider).then((result)=>{
      console.log(result);
      console.log(result.user.photoURL);
      axios
            .post("http://localhost:3001/api/auth/google", {
              username: result.user.displayName,
              email: result.user.email,
              image: result.user.photoURL,
            })
            .then((res) => {
              console.log(res.data)
              setUser(res.data)
            localStorage.setItem("user", JSON.stringify(res.data))
              navigate("/dashboard")
            });
    }).catch((err)=>{console.log(err)})
  }
   
  return (
    <>

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

          <div className="btn-login flex justify-between items-center">

            <div 
            className="button"
            onClick={submitFunction}
            >
           Login
            </div>  

            <GoogleButton  onClick={googlesekar}/>
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
    </>
  );
}

export default Login;

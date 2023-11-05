import React, { useState } from "react";
import "./Login.css";
import {Link} from 'react-router-dom'

function Login() {

  //hooks to handle the changing states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [allEntry, setAllEntry] = useState([]);
  // const [currentView,setView]=useState("Login")

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
  

  const submitFunction = (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    if (isPasswordValid && isUsernameValid) {
      const Entry = { username: username, password: password, email: email };
      setAllEntry([allEntry, Entry]);
      console.log(allEntry);
      // Handle form submission logic here

      //making the credentials empty after submitting
      setEmail("");
      setPassword("")
      setUsername("")
      alert("Logged in successfully")
    } else {
      alert("Invalid username or password. Please check the requirements.");

    }
  };

  return (

    <form onSubmit={submitFunction}>
      <div className="super-container">
      <div className="container">

        <div className="title">
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
                onChange={(event) => setEmail(event.target.value)}
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

           
            <div 
            className="button"
            >
              <Link to="/signup">Sign up</Link>
            
            </div>
 

          </div>
        </div>
        </div>
      </div>
    </form>
  );
}

export default Login;

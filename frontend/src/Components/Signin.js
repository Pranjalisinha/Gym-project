import "./Signin.css";
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
  const [data, setdata] = useState({
    "email": "",
    "Password": ""
  })

  const handlesubmit = (e) => {
    console.log(data)
    e.preventDefault()
    if (data.Password.length && data.email.length) {
      axios.post("https://gym-server-app.herokuapp.com/userRegister/Signin", data).then((loginData) => {
        localStorage.setItem("authorization", loginData.data.Authtoken)
        // console.log(localStorage.getItem("authorization"))

        localStorage.setItem("username", loginData.data.Name)
        console.log(loginData)
        if(loginData.data.usertype === "Trainer"){
          navigate("/Dashboard");
        } else {
          navigate("/Dashboardj");
        }
        
      })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const handleinput = (e, id) => {
    setdata({ ...data, [id]: e.target.value })
  }
  return (
    <>
      <div className="signin_page">
        <div className="form_signin">
          <form>
            <h1 style={{ color: "#FF6600" }}>Sign In</h1>
            <label>Email:</label>
            <input type="text" name="email" onChange={(e) => handleinput(e, "email")} required></input>
            <label>Password:</label>
            <input type="password" name="password" onChange={(e) => handleinput(e, "Password")} required></input>
            <button onClick={(e) => handlesubmit(e)} className="signin_btn">Sign In</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default Signin;
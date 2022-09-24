import "./RegisterPage.css";
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [data, setdata] = useState({})
  const Navigate = useNavigate()
  const [numberValidation, setnumberValidation] = useState("number-validity-true")
  const [numbererror, setnumbererror] = useState("numberexist-false")

  const handleRegister = (e) => {
    console.log(data);
    e.preventDefault()
    axios.post("http://localhost:3001/userRegister/Register", data)
      .then((userData) => {
        console.log(userData)
        Navigate("/Signin")
      })
      .catch((err) => {
        if (err.response.data === "PhoneExist") {
          setnumbererror("numberexist-true")
          setTimeout(() => {
            setnumbererror("numberexist-false")
          }, 10000)
        }
      })
  }
  const handleFormData = (e, id) => {
    setdata({ ...data, [id]: e.target.value })
    if (id === "Phone") {
      let stringnum = data.Phone + ""
      if (stringnum.length !== 9) {
        setnumberValidation("number-validity-false")
      } else {
        setnumberValidation("number-validity-true")
      }
    }
  }
  const checkInputs = () => {
    let c = 0
    for (let key in data) {
      let value = data[key]
      if (value.length) {
        c++
      }
    }
    return c
  }
  return (
    <>
      <div className="form_page">
        <div className="form_box">
          <form>
            <h1 style={{ color: "#FF6600" }}>Register</h1>
            <label>Name:</label>
            <input type="text" name="name" onChange={(e) => handleFormData(e, "Name")} required></input>
            <label>Phone:</label>
            <input type="text" name="phone" onChange={(e) => handleFormData(e, "Phone")} required></input>
            <p className={numberValidation}>Please enter a valid number</p>
            <p className={numbererror}>Number already exist</p>
            <label>Email:</label>
            <input type="text" name="email" onChange={(e) => handleFormData(e, "Email")} required></input>
            <label>Address:</label>
            <input type="text" name="address" onChange={(e) => handleFormData(e, "Address")} required></input>
            <label>Age:</label>
            <input type="text" name="Age" onChange={(e) => handleFormData(e, "Age")} required></input>
            <label>Password:</label>
            <input type="password" name="password" onChange={(e) => handleFormData(e, "Password")} required></input>
            <div className="radio">
              <input type='radio' name='userType' value='Trainer' onChange={(e) => handleFormData(e, "UserType")} />Trainer<input type='radio' name='userType' value='Joiner' onChange={(e) => handleFormData(e, "UserType")} />Joiner
            </div>
            <button className="sub_btn" onClick={checkInputs() !== 7 ? null : (e) => handleRegister(e)}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default RegisterPage;
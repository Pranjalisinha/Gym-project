import React from "react";
import "./Register.css";
import { Link } from 'react-router-dom';

const Register = ()=>{
    return(
        <>
        <div className="regis">
        <h1>CREDO <font color="#FF6600">FITNESS</font> <font color='white'>CENTER</font></h1>
        <p>The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.</p>
        <Link to="/RegisterPage">
        <button className="Btn">Register</button></Link>
        <Link to="/Signin">
        <button className="Btn2">Sing In</button></Link>
        </div>
        </>
    )
}
export default Register;
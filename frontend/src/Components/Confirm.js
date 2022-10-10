import React from "react";
import './Confirm.css';
import { Link } from "react-router-dom";

const Confimation = () =>{
    return(
        <div className="child_c">
            <Link to={'/DashboardJ'}><button className="btn_con">X</button></Link>
            <h1 style={{color: "white"}}> order Confirm</h1>
            <p className="text">Click on the X to go back</p>
        </div>
    )
}
export default Confimation;
import React, { useState, useEffect } from "react";
import './Dashboard.css';
import axios from "axios";

const Dashboard = ()=>{
    const slotCountA = 30;
    const slotCountC = 30;
    const slotCountW = 30;
    const [bookdata, setBookData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/joinGym/gym").then((data)=>{
           setBookData(data.data);
           
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    console.log(bookdata);
    const getExercise = (bookdata)=>{
        let a = 0;
        let c = 0; let w=0;
        for(let i=0; i<bookdata.length; i++){
            if(bookdata[i].Exercise === "Aerobics"){
                a++;
            }
            if(bookdata[i].Exercise === "Cardio"){
                c++;
            }
            if(bookdata[i].Exercise === "Weight Lifting"){
                w++;
            }
        }
    
        return [a, c, w]
    }
   
    let arr = [...getExercise(bookdata)]
    let aer = arr[0];
    let cardo = arr[1];
    let W_l = arr[2];
        
       let Aero = slotCountA - aer;
       let Cardo = slotCountC - cardo;
       let Weight = slotCountW - W_l;
    return(
        <>
        <div className="dash_board">
        <div className="child_d">
        <h1>CREDO <font color="#FF6600">GYM</font> <font color="#FFFFFF">DASHBOARD</font></h1>
        <div className="group">
        <div className="container_d">
        <img src="aerobics.jpg" alt="aerobic" className="img"/>
        <p><b>Aerobics</b> <br/> <b>Timing:</b> 12-2 PM<br/><b>Remaining Slot: </b>{Aero}<br/><b>Booked Slot: </b>{aer}</p>
        </div>
        <div className="container_d">
        <img src="cardio.jpg" alt="cardio" className="img"/>
        <p><b>Cardio</b> <br/> <b>Timing:</b> 2-4 PM<br/><b>Remaining Slot: </b>{Cardo}<br/><b>Booked Slot: </b>{cardo}</p>
        </div>
        <div className="container_d">
        <img src="wight_lifting.jpg" alt="wight_lifting" className="img"/>
        <p><b>Weight Lifting</b> <br/> <b>Timing:</b> 4-6 PM <br/><b>Remaining Slot: </b>{Weight}<br/><b>Booked Slot: </b>{W_l}</p>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}
export default Dashboard;
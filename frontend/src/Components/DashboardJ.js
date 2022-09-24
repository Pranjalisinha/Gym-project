import React, { useState, useEffect } from "react";
import './Dashboard.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const DashboardJ = () => {
    const Navigate = useNavigate();
    const [user, setUser] = useState([]);
    const slotCountA = 30;
    const slotCountC = 30;
    const slotCountW = 30;
    const [get, setget] = useState(true)
    const [bookslot, setBookslot] = useState("");
    const Token = localStorage.getItem("authorization");
    const username = localStorage.getItem("username");
    const [filled, setFilled] = useState([]);

    useEffect(() => {
        allUserData();
    }, []);
    const allUserData = () => {
        axios.get("http://localhost:3001/userRegister/user").then((data) => {
            setUser(data.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    let trainer = [];
    for (let i = 0; i < user.length; i++) {
        if (user[i].UserType === "Trainer") {
            trainer.push(user[i].Name);
        }
    }
    const selecthandlerd = (e) => {
        console.log(bookslot)
        if (e.target.value === "Trainer") {
            setBookslot(user)
            setget(!get)
        } else {
            const newdata = e.target.value
            setBookslot(newdata);
        }
    }
    const submitSlotA = (e) => {
        e.preventDefault();
        if(bookslot.length <= 0){
            alert("Select Tainer");
        } else{
        axios({
            method: 'POST',
            url: "http://localhost:3001/joinGym/join",
            data: {
                Joiner: username,
                Trainer: bookslot,
                Exercise: 'Aerobics',
                Joines: 1,
            },
            headers: {
                authorization: Token,
            },
        }).then((res) => {
            Navigate("/Confirm");

        }).catch((err) => {
            console.log(err)
        })
    }
    }
    const submitSlotC = (e) => {
        e.preventDefault();
        if(bookslot.length<=0){
            alert("Select Trainer")
        } else {
        axios({
            method: 'POST',
            url: "http://localhost:3001/joinGym/join",
            data: {
                Joiner: username,
                Trainer: bookslot,
                Exercise: 'Cardio',
                Joines: 1,
            },
            headers: {
                authorization: Token,
            },
        }).then((res) => {
            Navigate("/Confirm");

        }).catch((err) => {
            console.log(err)
        })
    }
    }
    const submitSlotw = (e) => {
        e.preventDefault();
        if(bookslot.length <= 0){
            alert("Select Trainer");
        } else {
        axios({
            method: 'POST',
            url: "http://localhost:3001/joinGym/join",
            data: {
                Joiner: username,
                Trainer: bookslot,
                Exercise: 'Weight Lifting',
                Joines: 1,
            },
            headers: {
                authorization: Token,
            },
        }).then((res) => {
            Navigate("/Confirm");

        }).catch((err) => {
            console.log(err)
        })
    }
    }
    useEffect(()=>{
        axios.get("http://localhost:3001/joinGym/gym").then((data)=>{
           setFilled(data.data);
           
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    console.log(filled);
    const filterExercise = (n) =>{
        let a =0; let c = 0; let w=0;
        for(let i=0; i<n.length; i++){
            if(n[i].Exercise === 'Aerobics'){
                a++;
            }
            if(n[i].Exercise === 'Cardio'){
                c++;
            }
            if(n[i].Exercise === 'Weight Lifting'){
                w++;
            }
        }
        return [a, c, w];
    }
    let arr = [...filterExercise(filled)];
    let aer = arr[0]
    let cardo = arr[1];
    let W_l = arr[2];
        
       let Aero = slotCountA - aer;
       let Cardo = slotCountC - cardo;
       let Weight = slotCountW - W_l;

    return (
        <>
            <div className="dash_board">
                <div className="child_d">
                    <h1>CREDO <font color="#FF6600">GYM</font> <font color="#FFFFFF">DASHBOARD</font></h1>
                    <div className="group">
                        <div className="container_d">
                            <img src="aerobics.jpg" alt="aerobic" className="img" />
                            <p><b>Aerobics</b> <br /> <b>Timing:</b> 12-2 PM<br /><b>Remaining Slot: </b>{Aero}<br/><b>Booked Slot: </b>{aer}<br /><select className="select" onChange={(e) => selecthandlerd(e)}>
                                <option value="Trainer">Trainer</option>
                                {trainer.map((data) => {
                                    return (<option value={data}>{data}</option>)
                                })}
                            </select><br/>
                                {aer>=30?null:<button className="Booking" onClick={(e) => submitSlotA(e)}>Book slot Now</button>}</p>
                        </div>
                        <div className="container_d">
                            <img src="cardio.jpg" alt="cardio" className="img" />
                            <p><b>Cardio</b> <br /> <b>Timing:</b> 2-4 PM<br /><b>Remaining Slot: </b>{Cardo}<br/><b>Booked Slot: </b>{cardo}<br /><select className="select" onChange={(e) => selecthandlerd(e)}>
                                <option value="Trainer">Trainer</option>
                                {trainer.map((data) => {
                                    return (<option value={data}>{data}</option>);
                                })}
                            </select><br/>
                               {cardo>=30 ? null : <button className="Booking" onClick={(e) => submitSlotC(e)}>Book slot Now</button>}</p>
                        </div>
                        <div className="container_d">
                            <img src="wight_lifting.jpg" alt="wight_lifting" className="img" />
                            <p><b>Weight Lifting</b> <br /> <b>Timing:</b> 4-6 PM <br /><b>Remaining Slot: </b>{Weight}<br/><b>Booked Slot: </b>{W_l}<br /><select className="select" onChange={(e) => selecthandlerd(e)}>
                                <option value="Trainer">Trainer</option>
                                {trainer.map((data) => {
                                    return (<option value={data}>{data}</option>)
                                })}</select><br/>
                                {W_l>=30? null : <button className="Booking" onClick={(e) => submitSlotw(e)}>Book slot Now</button>}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardJ;
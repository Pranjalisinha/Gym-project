const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const dash_board = require("../models/dashboard");
const Users = require('../models/register_model')
const join = 0;
router.post("/join", (req, res)=>{
    try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        Users.find({email:user}).then((data)=>{
            if(data.length){
                dash_board.create({
                    Joiner: req.body.Joiner,
                    Trainer: req.body.Trainer,
                    Exercise: req.body.Exercise,
                    Joines: join,
                }).then(()=>{
                    res.status(200).send("Activity Added")
                    console.log("Exercise Added");
                })
            } else{
                res.status.apply(400).send('Uauthorize user')
            }
        }).catch((err)=>{
            res.status(400).send(err);
        })

    } catch(err) {
        res.status(400).send("Unauthorize user")
    }    
   
})

router.get("/gym", (req,res)=>{
    dash_board.find().then((data)=>{
        res.status(200).send(data);
        console.log(data);
    }).catch((err)=>{
        res.status(400).send(err);
        console.log(err);
    })
});
module.exports=router
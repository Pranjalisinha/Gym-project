const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")

const Users = require('../models/register_model')
const dash_board = require("../models/dashboard")

const salt = 10

router.post("/Register", async (req, res) => {
  const Email = await Users.find({ Email: req.body.Email })
  if (Email.length) {
    res.status(400).send("EmailExist")
  }
  else {
    const Phone = await Users.find({ Phone: req.body.Phone })
    if (Phone.length) {
      res.status(400).send("PhoneExist")
    }
    else {
      bcrypt.genSalt(salt, (salterr, saltval) => {
        if (!salterr) {
          bcrypt.hash(req.body.Password, saltval, (hasherr, hasval) => {
            if (!hasherr) {
              Users.create({
                Name: req.body.Name,
                Phone: req.body.Phone,
                Email: req.body.Email,
                Password: hasval,
                Address: req.body.Address,
                Age: req.body.Age,
                UserType: req.body.UserType,
              })
              res.status(200).send('successfully created');
              console.log("user Registered")
            }
            else {
              res.status(400).send("hasherr")
            }
          })
        } else {
          res.status(400).send("salterr")
        }
      })
    }
  }
})


router.post("/Signin", async (req, res) => {

  const signindata = await Users.find({ Email: req.body.email })
  if (signindata.length) {
    const data = await bcrypt.compare(req.body.Password, signindata[0].Password)
    console.log(signindata)
    console.log(data);
    if (data) {
      //generating token
      const Authtoken = jwt.sign(signindata[0].Email, process.env.SECRET_KEY)
      const username = signindata[0].Name
      const usertype = signindata[0].UserType
      res.status(200).send({ Authtoken: Authtoken, username: username , usertype: usertype});
      console.log("user Login")
    }
    else {
      res.status(400).send("Invalid password")
      console.log("Wrong password");
    }
  }
  else {
    res.status(400).send(`Invalid User`)
  }
})

router.get("/user", (req, res) => {
    Users.find().then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(400).send(err);
    })
})

module.exports = router
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors");
require("dotenv").config();
const register = require("./routes/register_routes");
const joingym = require("./routes/dashboard_routes");
app.use(cors());
app.use(express.json({limit:"30mb", extended: true}));

app.listen(process.env.PORT || 3001, (err) => {
  if (!err) {
    console.log("Server started at port 3001")
  } else {
    console.log(err);
  }
});

const url = "mongodb+srv://test1:test12@test1.bewchyb.mongodb.net/gym?retryWrites=true&w=majority"
mongoose.connect(url, (data) => {
  console.log("Successfully connected to db");
}, (err) => {
  console.log(err)
});
app.use("/userRegister",register);
app.use("/joinGym", joingym);


app.get("/",(req,res)=>{
    res.status(200).send("Gym App")
},(err)=>{
    console.log(err)
})
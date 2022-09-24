const mongoose=require("mongoose")

const Regschema=mongoose.Schema({
    Name:String,
    Phone:Number,
    Email:String,
    Password:String,
    Address: String,
    Age: Number,
    UserType: String,
})
const Users=mongoose.model("Gym",Regschema)
module.exports=Users
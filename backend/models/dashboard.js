const mongoose=require("mongoose")

const dashboard=mongoose.Schema({
    Joiner: String,
    Trainer: String,
    Exercise: String,
    Joines: Number,
})
const dash_board = mongoose.model("joiner",dashboard)
module.exports= dash_board;
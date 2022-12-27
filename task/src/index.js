const express = require("express")
const bodyParser = require("body-parser")
const  route  = require("./routes/route")
const { default: mongoose } = require("mongoose")
var app= express()

app.use(bodyParser.json())


app.use("/", route) 


mongoose.connect("mongodb+srv://linagodbole99:dAix1EtU6C6yxJDR@cluster0.oip3eje.mongodb.net/task",
{
    useNewUrlParser: true
})
.then((res)=>console.log("mongodb is connected"))
.catch((err)=>console.log(err))



app.listen(3000,()=>{
    console.log("Database is connected on port 3000");
})

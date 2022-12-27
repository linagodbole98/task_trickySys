const Router = require("express").Router()
const UserController = require("../controller/userController")
const GuestController = require("../controller/guestController")
const auth = require("../middleware/auth")

Router.get("/", (req,res)=>{
    res.status(200).send("hello world")
})


//User
Router.post("/register", UserController.Registration)
Router.post("/login", UserController.Login)

//Guest
Router.post("/guest/:id", auth.authentication, auth.authorization, GuestController.Registration)
Router.get("/getGuest/:id", GuestController.List)

module.exports= Router
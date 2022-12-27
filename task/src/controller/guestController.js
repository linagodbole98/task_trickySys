const User = require("../models/userModel")
const Guest = require("../models/guestModel")
const { emailRegex, phoneRegex, checkId, isValid, isValidPassword, isValidRequestBody } = require("../validation/validate")



const Registration = async (req, res) => {
    try {
        let data = req.body
        let { name, email, mobile, userId } = data
        
        if (!isValidRequestBody(data)) {  return res.status(400).send({status: false,message: "all fields are require",});  }
        
        if (!name) {  return res.status(400).send( {status: false,  message:"name is missing"})}
        if (!email) {  return res.status(400).send({ status: false,  message:"email is missing"})}
        if (!userId) {  return res.status(400).send({ status: false,  message:"userId is missing"})}
        if (!mobile) {  return res.status(400).send({ status: false,  message:"mobile is missing"})}
 
        const findUser = await User.findOne({ _id: userId });
        if (!findUser) return res.status(404).send({ status: false, message: "No such user found with this Id" });
      
        if (!email.trim().match(emailRegex))
            return res.status(400).send({ status: false, message: "Please enter valid email" })

        if (!mobile.trim().match(phoneRegex))
            return res.status(400).send({ status: false, message: "Please enter valid pan -Indian phone number" })

            let user = await Guest.findOne({email:email})
            if (user) { return res.status(404).send({ status: false, msg: "email id  is duplicate!" }) }
            
            let dupmobile = await User.findOne({mobile:mobile})    
            if (dupmobile) { return res.status(404).send({ status: false, msg: "mobile no  is duplicate!" }) }
 
        let response = await Guest.create(data)
        console.log(response);
        res.status(200).send({ data: response, message: "data added" })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


const List = async (req, res) => {
    try {
        let id = req.params.id
        if (!(id.match(checkId))) return res.status(400).send("id is incorrect")  
        
         let response = await Guest.find({userId:id})
        if (!response) return res.status(404).send("no data found")
        res.status(200).send({ status: true, data: response, message: "fetched" })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = { Registration, List }
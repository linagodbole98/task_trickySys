const User = require("../models/userModel")
const Guest = require("../models/guestModel")
const jwt = require("jsonwebtoken");
const {emailRegex, phoneRegex, isValidRequestBody, isValidPassword, isValid} = require("../validation/validate")


const Registration = async (req, res) => {
    try {

        let data = req.body
        let { name, email, password, mobile } = data 

        
        if (!isValidRequestBody(data)) {  return res.status(400).send({status: false,message: "all fields are require",});  }

  
        if (!name) { return  res.status(400).send({status: false, message: "name is missing"})}
        if (!email) {  return res.status(400).send({status: false, message: "email is missing"})}
        if (!password) { return  res.status(400).send({status: false, message: "password is missing"})}
        if (!mobile) {  return res.status(400).send({status: false, message: "mobile is missing"})}

        

        if (!email.trim().match(emailRegex))
            return res.status(400).send({ status: false, message: "Please enter valid email" })

        if (!mobile.trim().match(phoneRegex))
            return res.status(400).send({ status: false, message: "Please enter valid pan -Indian phone number" })

        let user = await User.findOne({email:email})    
        if (user) { return res.status(404).send({ status: false, msg: "email id  is duplicate!" }) }

        let dupmobile = await User.findOne({mobile:mobile})    
        if (dupmobile) { return res.status(404).send({ status: false, msg: "mobile no  is duplicate!" }) }
  
        if (!isValidPassword(password))
            return res.status(400).send({
                status: false,
                message: "Please provide a valid password ,Password should be of 8 - 15 characters",
            })
        let response = await User.create(data)
        console.log(response);
        res.status(200).send({ data: response, message: "data added" })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}





const Login = async function (req, res) {
    try {
        const loginData = req.body;
        const { email, password } = loginData;

        if (!isValidRequestBody(loginData)) {
            return res.status(400).send({
                status: false,
                message: "Invalid request, please enter your email and password",
            });
        }

        if (!isValid(email))
            return res.status(400).send({ status: false, message: "Email id required" });

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "password must be present" });
        }

        const user = await User.findOne({ email: email, password: password });

        if (!user) {
            return res.status(401).send({ status: false, msg: "Invalid credentials" });
        }

        let token = jwt.sign(
            { userId: user._id.toString(), iat: Math.floor(Date.now() / 1000) },
            "secret_key",
            { expiresIn: "30d" }
          );

          res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, msg: "User successfully logged In", "token":token });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};




module.exports = { Registration, Login }

const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const mongoose = require("mongoose");

const tokenRegex = /^[A-Za-z0-9-=]+\.[A-Za-z0-9-=]+\.?[A-Za-z0-9-_.+/=]*$/;

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

// ////////////////////////////////////////////[Authentication]///////////////////////////////////////////////////////
const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    let secretKey = "secret_key";

    if (!token) {return res.status(400).send({ status: false, msg: "Token must be presents" });
    }
    if (!tokenRegex.test(token)) return res.send(400).send({ status: false, message: "Please provide a valid  token" });

    try {
      let decodedToken = jwt.verify(token, secretKey);
      req.decodedToken = decodedToken;
    } catch (err) {
      return res.status(400).send({ status: false, message: err.message });
    }
    next();
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

// ///////////////////////////[Authorization]///////////////////////////////////////////////////////////////////////

const authorization = async function (req, res, next) {
  try {
    let user_id = req.params.id;
  

    let token = req.headers["x-api-key"];
    let decodedToken = jwt.verify(token, "secret_key");
  
    let decodedUser = decodedToken.userId;
    console.log(decodedUser);

    if (!isValidObjectId(user_id)) return res.status(400).send({ status: false, message: "please provided valid user id" });

    const findUser = await User.findOne({ _id: user_id });

    if (!findUser) return res.status(404).send({ status: false, msg: "No user found or it may be deleted" });

    const user = findUser._id.toString();

    console.log(decodedUser);
    console.log(user);

    if (decodedUser == user) {
      next();
    } else {
      res.status(401).send({
         status: false,
        message: "You are not authorised to perform this action",
      });
    }
  } catch (err) {
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports.authentication = authentication;
module.exports.authorization = authorization;

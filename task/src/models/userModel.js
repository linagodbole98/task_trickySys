const mongoose= require("mongoose")

const UserSchema = mongoose.Schema({

    name :{
        type:String
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    mobile:{
        type:Number,
        unique:true
    },
    password:{
        type:String,
        require:true
    }


})

module.exports = mongoose.model("users", UserSchema)
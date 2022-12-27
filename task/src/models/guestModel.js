const mongoose= require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const GuestSchema = mongoose.Schema({

    userId: {
        type: ObjectId,
        required: [true, "userId is required"],
        ref: "users",
      },
    name:{
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
    }
})

module.exports = mongoose.model("guest", GuestSchema)
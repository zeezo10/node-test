const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema (
  {

    id : {
      type : String,
      required : true
    },
    name : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : true
    },
    age : {
      type : Number,
      required : true
    },

  }
)

const User = mongoose.models.User || new mongoose.model("User" , UserSchema)
module.exports = User
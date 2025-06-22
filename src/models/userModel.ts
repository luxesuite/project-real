import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{type:String},
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String}
},{
    timestamps:true
})

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User
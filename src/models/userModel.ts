import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{type:String},
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    password:{type:String},
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{
    timestamps:true
})

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User
import { model, models, Schema } from "mongoose";


const withdrawalSchema = new Schema({
    username:String,
    name:String,
    amount:{
        type: String || Number,
        
    },
    confirmed:{type:String,enum:["yes","no","unknown"]},
    action:{type:String,default:"withdrawal"},
    date:String
})

const Withdrawal= models.Withdrawal || model("Withdrawal",withdrawalSchema)

export default Withdrawal
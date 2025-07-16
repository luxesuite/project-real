import { model, models, Schema } from "mongoose";


const depositSchema = new Schema({
    username:String,
    name:String,
    amount:{
        type: String || Number,
        
    },
    action:{type:String,default:"deposit"},
    date:String
})

const Deposit = models.Deposit || model("Deposit",depositSchema)

export default Deposit
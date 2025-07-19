import { model, models, Schema } from "mongoose";


const historySchema = new Schema({
    username:String,
    actionPerformed:{type:String,enum:["add","edit","delete"]},
     action:{type:String},
},{
    timestamps:true
})

const History = models.History || model("History",historySchema)

export default History
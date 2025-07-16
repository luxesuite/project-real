import { model, models, Schema } from "mongoose";


const investmentSchema = new Schema({
    username:String,
    name:String,
    confirmed:String,
    amount:{
        type: String || Number,
        
    },
    profitReturn:String || Number,
     action:{type:String,default:"investment"},
    plan:{type:String,default:"starter"},
    date:String
})

const Investment = models.Investment || model("Investment",investmentSchema)

export default Investment
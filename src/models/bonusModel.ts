import { model, models, Schema } from "mongoose";


const bonusSchema = new Schema({
    username:String,
    name:String,
    amount:{
        type: String || Number,
        
    },
    action:{type:String,default:"bonus"},
    date:String
})

const Bonus = models.Bonus || model("Bonus",bonusSchema)

export default Bonus
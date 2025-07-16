import { model, models, Schema } from "mongoose";


const notificationSchema = new Schema({
    username:String,
    notificationType:{
        type:String,
        enum:["deposit","bonus","investment","withdrawal","signup"],
    },
    read:{
        type:String,
        enum:["yes","no","unknown"]
    },
    details:String,
    action:{type:String,default:"notification"},
    date:String
})

const Notification = models.Notification || model("Notification",notificationSchema)

export default Notification
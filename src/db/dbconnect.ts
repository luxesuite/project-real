import mongoose from "mongoose"


export default async function connectDb (){
    
    try {
    await mongoose.connect( process.env.MONGO_URL as string)

    console.log("coneected successfully");
    return {success:true}
    
} catch (error) {
    
    console.log("an error ocurred");
    return {success:false}
}

}
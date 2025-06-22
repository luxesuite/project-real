import {jwtVerify} from "jose"

export const verifyToken = async(token:string)=>{

    try {
        const secret = new TextEncoder().encode(process.env.JSON_SECRET as string)
        const {payload} = await jwtVerify(token,secret) 
        return payload
    } catch (error) {
        console.log("JWT verification failed",error);
        return null
        
    }

} 
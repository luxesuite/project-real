import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../utils/verifyToken";

export const middleware = async(req:NextRequest)=>{

const header = req.headers.get("Authorization")

// console.log(header);

// const decodeToken = await verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbWVzIiwiZW1haWwiOiJqYW1lc0BnbWFpbC5jb20iLCJpYXQiOjE3NTA1MzAxODksImV4cCI6MTc1MDUzMDc4OX0.Kecwp154qqQPegXH0I8-k_1ehoJOPF_1HWEQ-FFXCZY")
//   console.log(decodeToken);
  const pathname = req.nextUrl.pathname
console.log(pathname);

    console.log("running everytime");
    return NextResponse.next()
    
}




export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|assets|\.well-known).*)'],
};
// export const config = {
//   runtime: 'nodejs',
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|api|assets|\.well-known).*)'],
// }
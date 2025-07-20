import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../utils/verifyToken";

export const middleware = async(req:NextRequest)=>{

// const token = req.cookies.get("token")?.value 
// console.log(token,"well");
// if (!token) {
//     const loginUrl = new URL('/admin/sign-in', req.url);
//     return NextResponse.redirect(loginUrl);
// }

// const decodeToken = await verifyToken(token)
// console.log(decodeToken, "decoded");


// // && req.nextUrl.pathname.startsWith('/admin')


// if (!decodeToken) {
//     const loginUrl = new URL('/admin/sign-in', req.url);
//     return NextResponse.redirect(loginUrl);
// }
// if (decodeToken.role !== "admin" ) {
//     const loginUrl = new URL('/admin/sign-in', req.url);
//     return NextResponse.redirect(loginUrl);
//   }


  
  
  
  // const decodeToken = await verifyToken(token)
  // console.log(decodeToken);
  // if (!decodeToken || decodeToken.role !== "admin") {
  //   const loginUrl = new URL('/admin/sign-in', req.url);
  //   return NextResponse.redirect(loginUrl);
    
  // }
//   const pathname = req.nextUrl.pathname
// console.log(pathname);

 
      //  console.log("running everytime");
    return NextResponse.next()
}




export const config = {
  matcher:["/admin/:path*"]
  // matcher:["/admin","admin/acoounts/bonus"]
  // matcher: ['/((?!_next/static|_next/image|favicon.ico|api|assets|\.well-known).*)'],
};
// export const config = {
//   runtime: 'nodejs',
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|api|assets|\.well-known).*)'],
// }
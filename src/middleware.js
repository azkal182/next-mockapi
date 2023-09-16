import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  //return NextResponse.redirect(new URL('/home', request.url))
  let token = request.cookies.get('token')
  if (!token) {
  	//redirect to login

	request.nextUrl.pathname += '/auth/login'
return NextResponse.redirect(new URL('/auth/login', request.url));

 
//console.log(request.nextUrl.href)
  //  return NextResponse.redirect(request.nextUrl)
  
  }
  
	  
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/test-api/:path*', '/project/:path*'],
}
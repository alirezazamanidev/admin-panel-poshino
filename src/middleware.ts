import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {  

    const { pathname } = req.nextUrl

    const cookies = req.cookies.getAll('admin.session')

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/check-login`, {
        method: 'GET',
        headers: {
            'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }) 

    // اگر لاگین است
    if(response.status === 200){
        // اگر در صفحه لاگین است، به صفحه اصلی ریدایرکت کن
        if (pathname === '/login') {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next();
    }

    // اگر لاگین نیست
    if(response.status !== 200){
        // اگر در صفحه لاگین نیست، به لاگین ریدایرکت کن
        if (pathname !== '/login') {
            return NextResponse.redirect(new URL('/login', req.url))
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
      // شامل همه مسیرها به جز فایل‌های استاتیک
      '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
    ],
  };
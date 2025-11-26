// /middleware.js

import { NextResponse } from 'next/server';

/**
 * * @param {import('next/server').NextRequest} request
 * @returns
 */
export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const loginUrl = new URL('/login', request.url);

    // 1. 보호 대상이 아닌 경로 (로그인, 회원가입, API 등) 제외
    if (
        pathname.startsWith('/login') ||
        pathname.startsWith('/signup') ||
        pathname === '/' // 메인 페이지 등
    ) {
        return NextResponse.next();
    }

    // 2. HTTP-Only 쿠키 확인
    const jwtCookie = request.cookies.get('token');
    const tokenCookie = jwtCookie ? jwtCookie.value : null;

    if (!tokenCookie) {
        return NextResponse.redirect(loginUrl);
    }

    // 3. 쿠키 값에서 실제 AccessToken 추출 (JSON 문자열 파싱)
    let accessToken = null;
    try {
        const tokenObject = JSON.parse(tokenCookie);
        accessToken = tokenObject.accessToken;

        if (!accessToken) {
             return NextResponse.redirect(loginUrl);
        }

    } catch (error) {
        console.error("미들웨어 토큰 처리 오류:", error.message);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// 5. 미들웨어가 실행될 경로 설정
export const config = {
    // 제외파일
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|signup|.+\\.(?:svg|png|jpg|jpeg|gif|webp)).*)'],
};
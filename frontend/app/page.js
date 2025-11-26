// app/page.js
import { redirect } from 'next/navigation'; // Next.js의 리다이렉트 함수 사용

export default function HomePage() {
    redirect('/login');
}

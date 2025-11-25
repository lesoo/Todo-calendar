// /app/login/page.js
"use client";
import { ImageAtom, Icon, InputText, TextButton, IconButton } from "@atoms";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // React Router에서 import


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            alert("로그인 실패");
            return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.token); // ✅ 토큰 저장
        router.push('/dashboard');


    };

    const moveToSignUp = () => {
        alert('signup');
        // 뒤로가기 버튼을 클릭했을 때 현재 페이지로 돌아오지 않도록 상태와 함께 이동
        router.push('/signup', { state: { fromLogin: true } });
    };

    return (
        <div className="flex flex-col items-center justify-center p-2">
            <ImageAtom imgSrc='logo'/>
            <div className="flex flex-col items-center justify-center p-2">
                <form onSubmit={handleLogin} className="flex flex-col m-2">
                    <InputText className='shadow-md border rounded-sm p-2 m-2' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                    <InputText className='shadow-md border rounded-sm p-2 m-2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />

                    <TextButton type="submit" className='bg-gray-200 p-3 m-2 shadow-md rounded-md'>Login</TextButton>
                    {/* <IconButton type="text" icon='logo' className='flex flex-row items-center justify-center'onClick={()=>alert('click!')}>abc</IconButton> */}
                </form>
                <TextButton type="submit" className='p-3 m-2 underline' onClick={()=>moveToSignUp()}>Sign Up</TextButton>
            </div>
        </div>
    );
}

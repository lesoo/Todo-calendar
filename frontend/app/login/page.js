// /app/login/page.js
'use client';
import { ImageAtom, InputText, TextButton } from '@atoms';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import api from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, dispatch } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.user
            });
        } catch (error) {
            console.error("Login failed", error);
            alert("로그인에 실패했습니다.");
        } finally {
            router.replace('/dashboard');
        }
    };

    useEffect(() => {// 동작안하는듯?
        if (!state.isLoading && state.isAuthenticated) {
            router.push('/dashboard');
        }
    }, [state.isAuthenticated, state.isLoading, router]);

    const moveToSignUp = () => {
        alert('signup');
        router.push('/signup', { state: { fromLogin: true } });
    };

    return (
        <div className='flex flex-col items-center justify-center p-2'>
            <ImageAtom imgSrc='logo'/>
            <div className='flex flex-col items-center justify-center p-2'>
                <form onSubmit={handleLogin} className='flex flex-col m-2'>
                    <InputText className='shadow-md border rounded-sm p-2 m-2' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                    <InputText className='shadow-md border rounded-sm p-2 m-2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />

                    <TextButton type='submit' className='bg-gray-200 p-3 m-2 shadow-md rounded-md'>Login</TextButton>
                </form>
                <TextButton type='submit' className='p-3 m-2 underline' onClick={()=>moveToSignUp()}>Sign Up</TextButton>
            </div>
        </div>
    );
}

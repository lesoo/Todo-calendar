// app/dashboard/page.js
'use client';
import { useAuth } from '../contexts/AuthContext';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const { state } = useAuth();
    const router = useRouter();
    const [isEditMode, setEditMode] = useState(false);

    if (!state.isAuthenticated) {
        redirect('/login');
    }

    return (
        <section>
            <h2>대시보드</h2>
            <p> {state.user?.name || 'ID 정보 없음'}님 웰컴^^</p>
        </section>
    );
};






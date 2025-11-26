// lib/api.js

import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ;

const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

// TODO 향후 인터셉터(토큰 재발급 로직)도 이 파일에 추가할 수 있습니다.

export default api;
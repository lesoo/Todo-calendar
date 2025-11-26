//context/AuthContext.js
'use client';
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import api from '@/lib/api';

// 1. 초기 상태 정의
const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: true
};

// 상태 변화 로직을 중앙 집중화
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,//{id,name}
                isLoading: false
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                isLoading: false,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {

       const checkInitialAuth = async () => {
            try {
                const response = await api.get('/auth/verify');

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.user || { id: 'verified' }
                });

            } catch (error) {
                console.error("인증 쿠키 유효하지 않음", error);
                dispatch({ type: 'LOGOUT' });
            }

        };
        checkInitialAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};

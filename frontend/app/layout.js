// app/layout.js
"use client"
import './globals.css';
import React, { useState, useEffect } from 'react';
import { ImageAtom, ButtonAtom } from '@atoms';


export default function RootLayout({ children }) {

    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <html lang="ko">
            <body className={`bg-gray-50 text-gray-900 min-h-screen flex flex-col ${isMobile ? 'w-full' : 'w-1/2'}`}>
                {/* Header */}
                <header className="bg-white shadow-md p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">My App</h1>
                <nav>
                    {/* <ButtonAtom text="Login" /> */}
                </nav>
                </header>

                {/* Main content */}
                <main className="flex-1 p-4">
                {children}
                </main>

                {/* Footer */}
                <footer className="bg-white shadow-inner p-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} My App. All rights reserved.
                </footer>
            </body>
        </html>
  );
}

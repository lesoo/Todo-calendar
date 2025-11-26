// app/layout.js
'use client'
import './globals.css';
import React, { useState, useEffect } from 'react';
import { ImageAtom, ButtonAtom, Icon, Text } from '@atoms';


export default function RootLayout({ children }) {

    const [isMobile, setIsMobile] = useState();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loadMain = (children) => {
        return(
            <main className={`flex p-4 ${isMobile ? 'w-full' : 'w-1/2'} mx-auto`}>
                <div className={`justify-center`}>
                    {children}
                </div>
            </main>
            );
    }

    return (
        <html lang='ko'>
            <body className={`bg-gray-50 text-gray-900 min-h-screen flex flex-col w-full`}>
                {/* Header */}
                <header className={`bg-white shadow-md p-4 flex items-center`}>
                    <Icon icon={'logo'} size={40}/>
                    <Text className='m-2' size='2xl' weight='bold'>Todo-Calendar</Text>
                    <nav>
                        {/* <ButtonAtom text='Login' /> */}
                    </nav>
                </header>

                {/* Main content */}
                {isMobile != null ? loadMain(children) : ''}

                {/* Footer */}
                <footer className='bg-white shadow-inner p-4 text-center text-sm text-gray-500'>
                &copy; {new Date().getFullYear()} My App. All rights reserved.
                </footer>
            </body>
        </html>
  );
}

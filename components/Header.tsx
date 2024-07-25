'use client';
import React from 'react';
import { useAuth } from '@/components/Auth';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/icons/logo.png';
import { ModeToggle } from '@/components/mode-toggle';

const Header: React.FC = () => {
    const { currentUser, logout } = useAuth();

    return (
        <header className='w-full'>
            <div className='container mx-auto flex justify-between items-center px-8'>
                <a href='/'>
                    <Image src={logo} alt="logo" width={48} height={48} />
                </a>
                <div className='flex gap-5'>
                    <ModeToggle />
                    {currentUser ? (
                        <div className='flex gap-5 items-center'>
                            <span>{currentUser.email}</span>
                            <button onClick={logout}>Log Out</button>
                        </div>
                    ) : (
                        <div className='flex gap-5 items-center'>
                            <Link href="/signup">
                                Sign Up
                            </Link>
                            <Link href="/login">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

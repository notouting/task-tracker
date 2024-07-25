'use client';
import React from 'react';
import { useAuth } from '@/components/Auth';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/icons/logo.png';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <span className="">{currentUser.email}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem >
                                        <button onClick={logout}>Log Out</button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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

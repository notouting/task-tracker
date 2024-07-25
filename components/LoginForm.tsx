'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/Auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { login, currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            // Redirect if the user is already logged in
            router.push('/');
        }
    }, [currentUser, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            setEmail('');
            setPassword('');
        } catch (err) {
            console.log(err);
            setError('Failed to log in');
        }
    };



    return (
        <Card className="w-full max-w-md mx-auto mt-10 p-5">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1"
                        />
                    </div>
                    <Button type="submit" className="w-full mt-4">Login</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;

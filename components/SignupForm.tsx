'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/components/Auth';
import { useRouter } from 'next/navigation'; // For Next.js redirection
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignupForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { currentUser, login } = useAuth();
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
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            login(email, password);
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('Failed to sign up');
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-10 p-5">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
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
                    <Button type="submit" className="w-full mt-4">Sign Up</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default SignupForm;

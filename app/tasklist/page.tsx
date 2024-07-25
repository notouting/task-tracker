'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { useRouter } from 'next/navigation';
import firebase from 'firebase/compat/app';

const TaskPage = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user as firebase.User);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Task Tracker</h1>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default TaskPage;

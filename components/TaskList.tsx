'use client';
import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/components/Auth';
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TaskListLoading from '@/components/TaskListLoading';

interface Task {
    id: string;
    task: string;
    completed: boolean;
    priority: number;
    createdAt: { seconds: number; nanoseconds: number } | null;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setLoading(true);
            const q = query(collection(db, 'tasks', currentUser.uid, 'userTasks'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const tasksData: Task[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    tasksData.push({ id: doc.id, ...data } as Task);
                });
                setLoading(false);
                setTasks(tasksData);
            });

            return () => unsubscribe();
        }
    }, [currentUser]);

    const handleDelete = async (id: string) => {
        if (currentUser) {
            await deleteDoc(doc(db, 'tasks', currentUser.uid, 'userTasks', id));
        }
    };

    const handleToggleComplete = async (id: string, completed: boolean) => {
        if (currentUser) {
            await updateDoc(doc(db, 'tasks', currentUser.uid, 'userTasks', id), { completed: !completed });
        }
    };

    const handleChangePriority = async (id: string, priority: number) => {
        if (currentUser) {
            await updateDoc(doc(db, 'tasks', currentUser.uid, 'userTasks', id), { priority });
        }
    };

    // Sort tasks by priority, then by creation time
    const sortedTasks = tasks.sort((a, b) => {
        if (a.priority === b.priority) {
            return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
        }
        return b.priority - a.priority;
    });

    return (
        <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {loading ? <TaskListLoading /> : ''}
            {sortedTasks.map((task) => (
                <Card
                    key={task.id}
                    className={`w-full border ${task.priority === 3
                        ? 'border-red-500'
                        : task.priority === 2
                            ? 'border-yellow-500'
                            : 'border-green-500'
                        } ${task.completed ? 'opacity-60 bg-gray-200' : ''}`}
                >
                    <CardHeader className='flex justify-between w-full'>
                        <h3 className={task.completed ? 'line-through text-gray-500' : ''}>{task.task}</h3>
                        <CardDescription>
                            {task.createdAt ? new Date(task.createdAt.seconds * 1000).toLocaleString('en-US', { hour12: false }) : 'Unknown'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select onValueChange={(value) => handleChangePriority(task.id, Number(value))} defaultValue={task.priority.toString()}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="3">High Priority</SelectItem>
                                <SelectItem value="2">Medium Priority</SelectItem>
                                <SelectItem value="1">Low Priority</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className='flex justify-between w-full mt-5'>
                            <Button variant="ghost" onClick={() => handleToggleComplete(task.id, task.completed)}>
                                {task.completed ? 'Uncomplete' : 'Complete'}
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(task.id)}>
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </ul>
    );
};

export default TaskList;

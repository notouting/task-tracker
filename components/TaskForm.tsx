'use client';
import { useAuth } from '@/components/Auth';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { db } from '@/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import Hero from '@/components/Hero';

const TaskForm: React.FC = () => {
    const { currentUser } = useAuth();
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState<number>(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentTask: string = task
        setTask('');
        if (currentUser && currentTask.length > 0) {
            try {
                await addDoc(collection(db, 'tasks', currentUser.uid, 'userTasks'), {
                    currentTask,
                    completed: false,
                    priority,
                    createdAt: serverTimestamp()
                });
                setPriority(1); // Reset to default priority
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        } else {
            alert('Please enter a task');
        }
    };

    return (
        <>

            {currentUser ? <Popover>
                <PopoverTrigger asChild >
                    <Button variant="outline" className='mb-5'>Add Task +</Button>
                </PopoverTrigger >
                <PopoverContent className="w-full p-4">
                    <Card>
                        <CardHeader className='flex gap-3'>
                            <CardTitle>Add Task</CardTitle>
                            <CardDescription>Enter your task details below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <Input
                                    type="text"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    placeholder="Enter your task"
                                    required
                                />
                                <Select onValueChange={(value) => setPriority(Number(value))} value={String(priority)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Low Priority</SelectItem>
                                        <SelectItem value="2">Medium Priority</SelectItem>
                                        <SelectItem value="3">High Priority</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button type="submit">Add Task</Button>
                            </form>
                        </CardContent>
                    </Card>
                </PopoverContent>
            </Popover > : <Hero />}

        </>
    );
};

export default TaskForm;

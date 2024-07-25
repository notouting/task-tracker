import React from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

const HomePage: React.FC = () => (
  <div className='container mx-auto py-5'>
    <TaskForm />
    <TaskList />
  </div>
);

export default HomePage;

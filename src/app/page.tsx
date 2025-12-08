'use client';

import CreateTodo from '@/features/todo/components/CreateTodo';
import TodoList from '@/features/todo/components/TodoList';
import TodoMenu from '@/features/todo/components/TodoMenu';
import { useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

const dummyTodos: Todo[] = [
  {
    id: 1,
    title: 'Complete online JavaScript course',
    isCompleted: true,
  },
  {
    id: 2,
    title: 'Jog around the park 3x',
    isCompleted: false,
  },
  {
    id: 3,
    title: '10 minutes meditation',
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Read for 1 hour',
    isCompleted: false,
  },
  {
    id: 5,
    title: 'Pick up groceries',
    isCompleted: false,
  },
  {
    id: 6,
    title: 'Complete Todo App on Frontend Mentor',
    isCompleted: false,
  },
];

export default function Home() {
  const todoOptions = ['All', 'Active', 'Completed'];
  const [filter, setFilter] = useState(todoOptions[0]);

  const filteredTodos = dummyTodos.filter((todo) => {
    if (filter === 'Active') return !todo.isCompleted;
    if (filter === 'Completed') return todo.isCompleted;
    return todo;
  });

  const activeTodo = dummyTodos.filter((todo) => !todo.isCompleted).length;

  const handleOptionClick = (option: string) => {
    setFilter(option);
  };

  return (
    <main className="flex flex-col space-y-4 text-sm text-Navy-900 sm:text-base md:space-y-6 lg:text-lg dark:text-Purple-100">
      <CreateTodo />
      <TodoList todos={filteredTodos}>
        <div className="flex items-center justify-between gap-x-4 bg-Gray-50 p-4 text-Gray-600 dark:bg-Navy-900">
          <p>{activeTodo} items left</p>
          <TodoMenu
            options={todoOptions}
            filter={filter}
            onOptionClick={handleOptionClick}
            className="hidden md:flex"
          />
          <button className="cursor-pointer hover:text-Navy-850 dark:hover:text-Purple-100">
            Clear Completed
          </button>
        </div>
      </TodoList>
      <TodoMenu
        options={todoOptions}
        filter={filter}
        onOptionClick={handleOptionClick}
        className="flex items-center justify-center gap-x-4 rounded-md bg-Gray-50 p-4 text-Gray-600 shadow-md md:hidden dark:bg-Navy-900"
      />
      <p className="mx-auto my-6 text-sm text-Gray-600 sm:text-base">
        Drag and drop to reorder list
      </p>
    </main>
  );
}

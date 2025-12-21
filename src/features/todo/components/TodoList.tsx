'use client';

import { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import React from 'react';

type TodoListProps = {
  todos: Todo[];
  onMove: (from: number, to: number) => void;
  children: React.ReactNode;
};

export default function TodoList({ todos, onMove, children }: TodoListProps) {
  return (
    <section className="flex h-[340px] flex-col justify-between overflow-hidden rounded-md bg-Gray-50 shadow-xl dark:bg-Navy-900">
      <div className="flex h-[340px] flex-col overflow-x-hidden overflow-y-auto">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} moveItem={onMove} />
        ))}
      </div>
      {children}
    </section>
  );
}

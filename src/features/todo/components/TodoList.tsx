'use client';

import { Todo } from '@/app/page';
import TodoItem from './TodoItem';
import React, { useEffect, useState } from 'react';

export default function TodoList({
  initialTodos,
  filter,
  children,
}: {
  initialTodos: Todo[];
  filter: string;
  children?: React.ReactNode;
}) {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Active') return !todo.isCompleted;
    if (filter === 'Completed') return todo.isCompleted;
    return todo;
  });

  const moveItem = (from: number, to: number) => {
    const items = todos.sort((a, b) => a.position - b.position);

    const fromIndex = items.findIndex((item) => item.position === from);
    const toIndex = items.findIndex((item) => item.position === to);

    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);

    const reordered = items.map((item, index) => ({
      ...item,
      position: index + 1,
    }));
    setTodos(reordered);
  };

  return (
    <section className="flex min-h-[340px] flex-col justify-between overflow-hidden rounded-md shadow-xl">
      <div className="flex flex-col">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} moveItem={moveItem} />
        ))}
      </div>
      {children}
    </section>
  );
}

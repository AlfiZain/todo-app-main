import { Todo } from '@/app/page';
import TodoItem from './TodoItem';
import React from 'react';

export default function TodoList({
  todos,
  children,
}: {
  todos: Todo[];
  children?: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[340px] flex-col justify-between overflow-hidden rounded-md shadow-xl">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
      {children}
    </section>
  );
}

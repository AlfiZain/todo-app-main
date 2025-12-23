'use client';

import { useDrop } from 'react-dnd';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import React, { useRef } from 'react';

type TodoListProps = {
  todos: Todo[];
  onMove: (from: number, to: number) => void;
  children: React.ReactNode;
};

const SCROLL_THRESHOLD = 50;
const SCROLL_SPEED = 10;

export default function TodoList({ todos, onMove, children }: TodoListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [, dropRef] = useDrop({
    accept: 'TODO',
    hover(_, monitor) {
      const container = containerRef.current;

      if (!container) return;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;
      const rect = container.getBoundingClientRect();
      const pointerY = clientOffset.y;

      // Scroll to top
      if (pointerY < rect.top + SCROLL_THRESHOLD) {
        container.scrollTop -= SCROLL_SPEED;
      } 
      
      // Scroll to bottom
      if (pointerY > rect.bottom - SCROLL_THRESHOLD) {
        container.scrollTop += SCROLL_SPEED;
      }
    },
  });

  return (
    <section className="flex flex-col justify-between overflow-hidden rounded-md bg-Gray-50 shadow-xl dark:bg-Navy-900">
      <div
        ref={(node) => {
          containerRef.current = node;
          dropRef(containerRef);
        }}
        className="flex h-[340px] flex-col overflow-x-hidden overflow-y-auto"
      >
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} moveItem={onMove} />
        ))}
      </div>
      {children}
    </section>
  );
}

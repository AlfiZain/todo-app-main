'use client';

import { useEffect, useRef, useState } from 'react';
import TodoList from './TodoList';
import TodoMenu from './TodoMenu';
import { Todo } from '../types/todo';
import { TodoFilter } from '../types/filter';
import ClearTodoButton from './ClearTodoButton';
import { reorderTodo } from '../actions/todoActions';

type TodoListWrapperProps = {
  initialTodos: Todo[];
};

export default function TodoListWrapper({
  initialTodos,
}: TodoListWrapperProps) {
  const [todos, setTodos] = useState<Todo[]>(() =>
    [...initialTodos].sort((a, b) => a.position - b.position),
  );
  const [filter, setFilter] = useState<TodoFilter>('All');
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const todoOptions: TodoFilter[] = ['All', 'Active', 'Completed'];

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Active') return !todo.isCompleted;
    if (filter === 'Completed') return todo.isCompleted;
    return todo;
  });

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const activeTodo = initialTodos.filter((todo) => !todo.isCompleted).length;

  const handleOptionClick = (option: TodoFilter) => {
    setFilter(option);
  };

  const moveItem = (from: number, to: number) => {
    const items = [...todos].sort((a, b) => a.position - b.position);

    const fromIndex = items.findIndex((item) => item.position === from);
    const toIndex = items.findIndex((item) => item.position === to);

    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);

    const updatedTodos = items.map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    setTodos(updatedTodos);
    autosave(updatedTodos);
  };

  const autosave = (updatedTodos: Todo[]) => {
    if (saveTimeout.current) clearInterval(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      const todosId = updatedTodos.map((todo) => todo.id);

      await reorderTodo(todosId);
    }, 500);
  };

  return (
    <>
      <TodoList todos={filteredTodos} onMove={moveItem}>
        <div className="flex items-center justify-between gap-x-4 bg-Gray-50 p-4 text-Gray-600 dark:bg-Navy-900">
          <p>{activeTodo} items left</p>
          <TodoMenu
            options={todoOptions}
            filter={filter}
            onOptionClick={handleOptionClick}
            className="hidden md:flex"
          />
          <ClearTodoButton />
        </div>
      </TodoList>
      <TodoMenu
        options={todoOptions}
        filter={filter}
        onOptionClick={handleOptionClick}
        className="flex items-center justify-center gap-x-4 rounded-md bg-Gray-50 p-4 text-Gray-600 shadow-md md:hidden dark:bg-Navy-900"
      />
    </>
  );
}

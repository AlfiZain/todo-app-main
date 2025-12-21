import { getTodos } from '@/features/todo/actions/todoActions';
import CreateTodo from '@/features/todo/components/CreateTodo';
import TodoListWrapper from '@/features/todo/components/TodoListWrapper';

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex flex-col space-y-4 text-sm text-Navy-900 sm:text-base md:space-y-6 lg:text-lg dark:text-Purple-100">
      <CreateTodo />
      <TodoListWrapper initialTodos={todos} />
      <p className="mx-auto my-6 text-sm text-Gray-600 sm:text-base">
        Drag and drop to reorder list
      </p>
    </main>
  );
}

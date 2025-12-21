import { deleteCompletedTodos } from '../actions/todoActions';

export default function ClearTodoButton() {
  return (
    <form action={deleteCompletedTodos}>
      <button className="cursor-pointer hover:text-Navy-850 dark:hover:text-Purple-100">
        Clear Completed
      </button>
    </form>
  );
}

export default function CreateTodo() {
  return (
    <form action="">
      <label
        htmlFor="title"
        className="flex items-start space-x-4 rounded-md bg-Gray-50 p-4 dark:bg-Navy-900"
      >
        <div className="h-5 w-5 shrink-0 rounded-full border border-Gray-600" />
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Create a new todo..."
          className="w-full outline-none placeholder:text-Gray-600"
        />
      </label>
    </form>
  );
}

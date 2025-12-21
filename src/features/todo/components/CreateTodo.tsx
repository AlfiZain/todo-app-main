'use client';

import { useActionState, useState } from 'react';
import { createTodo } from '../actions/todoActions';
import { ActionState } from '../types/state';
import { CreateTodoSchema } from '../schemas/todoSchema';
import z from 'zod';

export default function CreateTodo() {
  const initialState: ActionState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTodo, initialState);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const handleSubmit = (formData: FormData) => {
    const result = CreateTodoSchema.safeParse({
      title: formData.get('title'),
      isCompleted: formData.get('isCompleted'),
    });

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      setClientErrors({
        title: flattened.fieldErrors.title?.[0] ?? '',
        isCompleted: flattened.fieldErrors.isCompleted?.[0] ?? '',
      });
      return;
    }

    setClientErrors({});
    formAction(formData);
  };

  return (
    <form action={handleSubmit}>
      <div className="flex items-start space-x-4 rounded-md bg-Gray-50 p-4 dark:bg-Navy-900">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            className="peer sr-only"
            aria-label="mark todo as completed"
          />
          <span className="h-5 w-5 rounded-full border border-Gray-600 bg-size-[10px_10px] bg-center bg-no-repeat peer-checked:bg-Blue-500 peer-checked:bg-[url(/icon-check.svg)] peer-focus-visible:ring-2 peer-focus-visible:ring-Blue-500" />
        </label>

        <label htmlFor="title" className="sr-only">
          Todo title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Create a new todo..."
          className="w-full caret-Blue-500 outline-none placeholder:text-Gray-600"
        />
      </div>
      {clientErrors?.title && (
        <span className="text-sm text-red-500">{clientErrors?.title}</span>
      )}
      {state?.errors.title && (
        <span className="text-sm text-red-500">{state?.errors.title}</span>
      )}
    </form>
  );
}

'use server';

import sql from '@/lib/db';
import { Todo } from '../types/todo';
import z from 'zod';
import { CreateTodoSchema } from '../schemas/todoSchema';
import { ActionState } from '../types/state';
import { revalidatePath } from 'next/cache';

export async function getTodos(): Promise<Todo[]> {
  try {
    const result = await sql<Todo[]>`
      SELECT id, title, is_completed AS "isCompleted", position
      FROM todos
      ORDER BY position ASC
    `;

    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Unable to load the todo list. Please try again later.');
  }
}

export async function createTodo(
  _prevState: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const result = CreateTodoSchema.safeParse({
    title: formData.get('title'),
    isCompleted: formData.get('isCompleted'),
  });

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);
    return {
      message: 'Invalid input. Please check the form fields and try again.',
      errors: fieldErrors,
    };
  }

  const { title, isCompleted } = result.data;

  try {
    await sql`
      INSERT INTO todos (title, is_completed)
      VALUES (${title}, ${isCompleted})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message:
        'Failed to create a new todo due to a server error. Please try again later.',
      errors: {},
    };
  }

  revalidatePath('/');

  return {
    message: null,
    errors: {},
  };
}

export async function toggleTodoStatus({
  id,
  isCompleted,
}: {
  id: number;
  isCompleted: boolean;
}) {
  try {
    await sql`
      UPDATE todos
      SET is_completed = ${!isCompleted}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(
      `Failed to update the completion status of the selected todo item. Please try again later.`,
    );
  }

  revalidatePath('/');
}

export async function deleteTodoById(id: number) {
  try {
    await sql`
      DELETE FROM todos
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(
      `Failed to delete the selected todo item. Please try again later.`,
    );
  }

  revalidatePath('/');
}

export async function deleteCompletedTodos() {
  try {
    await sql`
      DELETE FROM todos
      WHERE is_completed = true
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(
      'Failed to remove completed todos. Please try again later.',
    );
  }

  revalidatePath('/');
}

export async function reorderTodo(todosId: number[]) {
  if (!todosId.length) return;

  try {
    await sql`
      UPDATE todos
      SET position = ordered.position
      FROM (
        SELECT
          unnest(${sql.array(todosId)}::bigint[]) AS id,
          generate_series(1, ${todosId.length}) AS position
      ) AS ordered
      WHERE todos.id = ordered.id
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to reorder todo items. Please try again later.');
  }
}

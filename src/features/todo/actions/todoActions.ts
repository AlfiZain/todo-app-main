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
    throw new Error('Failed to Fetch Todos Data');
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
      message: 'Failed to Create Todo',
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
      message: 'Database Error: Failed to Create Todo.',
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
    throw new Error(`Failed to Toggle Todo ${id}`);
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
    throw new Error(`Failed to Delete Todo ${id}`);
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
    throw new Error('Failed to Delete Completed Todos');
  }

  revalidatePath('/');
}

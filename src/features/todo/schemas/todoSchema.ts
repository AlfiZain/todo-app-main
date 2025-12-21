import z from 'zod';

export const TodoSchema = z.object({
  id: z.coerce.number(),
  title: z.string().trim().min(1, { error: 'Please insert Todo title' }),
  isCompleted: z.coerce.boolean().default(false),
  position: z.coerce.number(),
});

export const CreateTodoSchema = TodoSchema.omit({ id: true, position: true });

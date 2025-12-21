'use client';

import Image from 'next/image';
import { deleteTodoById } from '../actions/todoActions';

export default function DeleteButton({ id }: { id: number }) {
  const deleteTodoAction = deleteTodoById.bind(null, id);

  return (
    <form action={deleteTodoAction}>
      <button
        type="submit"
        className="shrink-0 cursor-pointer p-1 outline-none hover:scale-115 focus-visible:ring-2 focus-visible:ring-Blue-500"
      >
        <Image
          src={'/icon-cross.svg'}
          alt="delete todo"
          width={12}
          height={12}
        />
      </button>
    </form>
  );
}

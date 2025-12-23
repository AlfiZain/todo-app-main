'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { toggleTodoStatus } from '../actions/todoActions';

interface CheckButtonProps {
  id: number;
  isCompleted: boolean;
}

export default function CheckButton({ id, isCompleted }: CheckButtonProps) {
  const toggleTodoStatusAction = toggleTodoStatus.bind(null, {
    id,
    isCompleted,
  });

  return (
    <form action={toggleTodoStatusAction} className="shrink-0">
      <button
        type="submit"
        className={clsx(
          'h-5 w-5 cursor-pointer rounded-full border border-Gray-600 outline-none hover:border-Blue-500 focus-visible:ring-2 focus-visible:ring-Blue-500',
          isCompleted ? 'bg-Blue-500' : 'bg-transparent',
        )}
      >
        {isCompleted && (
          <Image
            src={'/icon-check.svg'}
            alt="mark todo as completed"
            width={10}
            height={10}
            className="mx-auto"
          />
        )}
      </button>
    </form>
  );
}

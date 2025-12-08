'use client';

import clsx from 'clsx';
import Image from 'next/image';

interface CheckButtonProps {
  id: number;
  isCompleted: boolean;
}

export default function CheckButton({ id, isCompleted }: CheckButtonProps) {
  return (
    <button
      onClick={() => alert(`Todo-${id} Marked as completed`)}
      className={clsx(
        'h-5 w-5 shrink-0 cursor-pointer rounded-full border border-Gray-600 hover:border-Blue-500',
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
  );
}

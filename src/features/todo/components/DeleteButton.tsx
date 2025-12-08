'use client';

import Image from 'next/image';

export default function DeleteButton({ id }: { id: number }) {
  return (
    <button
      onClick={() => alert(`Todo-${id} is deleted`)}
      className="shrink-0 cursor-pointer"
    >
      <Image src={'/icon-cross.svg'} alt="delete todo" width={12} height={12} />
    </button>
  );
}

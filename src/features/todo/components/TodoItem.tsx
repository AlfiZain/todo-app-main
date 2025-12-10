'use client';

import clsx from 'clsx';
import CheckButton from './CheckButton';
import DeleteButton from './DeleteButton';
import { useDrag, useDrop } from 'react-dnd';

interface TodoItemProps {
  id: number;
  title: string;
  isCompleted: boolean;
  position: number;
  moveItem: (from: number, to: number) => void;
}

export default function TodoItem({
  id,
  title,
  isCompleted,
  position,
  moveItem,
}: TodoItemProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'TODO',
    item: { position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'TODO',
    drop: (item: { position: number }) => {
      if (item.position !== position) {
        moveItem(item.position, position);
        item.position = position;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        dragRef(node);
        dropRef(node);
      }}
      className={clsx(
        'flex cursor-pointer gap-x-4 border-b border-b-Gray-300 bg-Gray-50 p-4 dark:border-b-Gray-600 dark:bg-Navy-900',
        isDragging ? 'opacity-50' : 'opacity-100',
      )}
    >
      <CheckButton id={id} isCompleted={isCompleted} />
      <p
        className={clsx(
          'grow',
          isCompleted ? 'text-Gray-600 line-through' : '',
        )}
      >
        {title}
      </p>
      <DeleteButton id={id} />
    </div>
  );
}

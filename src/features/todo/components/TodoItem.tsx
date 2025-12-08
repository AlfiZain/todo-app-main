import clsx from 'clsx';
import CheckButton from './CheckButton';
import DeleteButton from './DeleteButton';

interface TodoItemProps {
  id: number;
  title: string;
  isCompleted: boolean;
}

export default function TodoItem({ id, title, isCompleted }: TodoItemProps) {
  return (
    <div className="flex gap-x-4 border-b border-b-Gray-300 bg-Gray-50 p-4 dark:border-b-Gray-600 dark:bg-Navy-900">
      <CheckButton id={id} isCompleted={isCompleted} />
      <p
        className={clsx(
          'grow cursor-pointer',
          isCompleted ? 'text-Gray-600 line-through' : '',
        )}
      >
        {title}
      </p>
      <DeleteButton id={id} />
    </div>
  );
}

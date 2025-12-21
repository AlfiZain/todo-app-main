'use client';

import clsx from 'clsx';
import { TodoFilter } from '../types/filter';

interface TodoMenuProps {
  options: string[];
  filter: string;
  onOptionClick: (option: TodoFilter) => void;
  className?: string;
}

export default function TodoMenu({
  options,
  filter,
  onOptionClick,
  className,
}: TodoMenuProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-x-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionClick(option as TodoFilter)}
            className={clsx(
              'cursor-pointer font-bold',
              filter === option
                ? 'text-Blue-500'
                : 'hover:text-Navy-850 dark:hover:text-Purple-100',
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button className="cursor-pointer" onClick={toggleTheme}>
      <Image
        src={theme === 'light' ? '/icon-moon.svg' : '/icon-sun.svg'}
        width={24}
        height={24}
        alt="toggle theme"
        className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10"
      />
    </button>
  );
}

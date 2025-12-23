'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme((prev) => {
      return prev === 'light' ? 'dark' : 'light';
    });
  };

  return (
    <button
      className="cursor-pointer"
      onClick={toggleTheme}
      type="button"
      aria-label="toggle theme"
    >
      <Image
        src={theme === 'light' ? '/icon-moon.svg' : '/icon-sun.svg'}
        width={24}
        height={24}
        alt=""
        className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10"
      />
    </button>
  );
}

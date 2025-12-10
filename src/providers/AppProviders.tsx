'use client';

import ThemeProvider from '@/contexts/ThemeContext';
import { MultiBackend } from 'dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { DndProvider } from 'react-dnd';

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <ThemeProvider>{children}</ThemeProvider>
    </DndProvider>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { josefinSans } from '@/components/ui/fonts';
import ThemeProvider from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

export const metadata: Metadata = {
  title: 'Alfi Zain | Todo app',
  description: 'A simple todo app built with next js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} bg-Gray-50 antialiased dark:bg-Navy-950`}
      >
        <ThemeProvider>
          <div className="h-[200px] bg-[url('/bg-mobile-light.jpg')] bg-cover bg-center md:h-[220px] md:bg-[url('/bg-desktop-light.jpg')] lg:h-[260px] xl:h-[300px] dark:bg-[url('/bg-mobile-dark.jpg')] md:dark:bg-[url('/bg-desktop-dark.jpg')]" />
          <div className="absolute top-2 left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 py-8 lg:top-6 xl:top-16">
            <header className="mb-8 flex flex-row justify-between">
              <h1 className="text-2xl font-bold tracking-[0.4em] text-Gray-50 md:text-3xl lg:text-4xl">
                TODO
              </h1>
              <ThemeToggle />
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

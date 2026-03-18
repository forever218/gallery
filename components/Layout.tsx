import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-black dark:text-white">
            未来的相册
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              主页
            </Link>
            <Link href="/albums" className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              相册
            </Link>
            <Link href="https://2am.top" className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              博客
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
              关于
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="切换主题"
            >
              {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState<{ count: number; time: number } | null>(null);
  const [showLoadingInfo, setShowLoadingInfo] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 只在首页显示加载信息
    if (router.pathname === '/' && loadingInfo) {
      setShowLoadingInfo(true);
      
      // 3秒后自动隐藏
      const timer = setTimeout(() => {
        setShowLoadingInfo(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [loadingInfo, router.pathname]);

  // 监听图片加载完成事件
  useEffect(() => {
    const handleImagesLoaded = (event: CustomEvent) => {
      const { count, time } = event.detail;
      setLoadingInfo({ count, time });
    };

    window.addEventListener('imagesLoaded', handleImagesLoaded as EventListener);
    return () => {
      window.removeEventListener('imagesLoaded', handleImagesLoaded as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-black dark:text-white">
            未来的相册
          </Link>
          
          {/* 图片加载信息提示 - 仅在桌面端显示 */}
          {showLoadingInfo && (
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-500 opacity-100">
              <div className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                {loadingInfo?.count}张图片加载于{loadingInfo?.time}ms
              </div>
            </div>
          )}
          
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

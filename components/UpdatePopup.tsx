import { useEffect, useState, useRef } from 'react';

interface UpdatePopupProps {
  lastUpdated: string;
  duration?: number; // 持续时间（毫秒），默认 5000
}

export default function UpdatePopup({ lastUpdated, duration = 5000 }: UpdatePopupProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  };

  useEffect(() => {
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        setVisible(false);
        return;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="relative overflow-hidden rounded-xl bg-black px-5 py-3.5 text-white shadow-2xl dark:bg-white dark:text-black">
        <div className="mb-2 text-sm">
          相册最后更新于 {formatDate(lastUpdated)}
        </div>
        {/* 进度条 */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/30 dark:bg-black/30">
          <div
            className="h-full rounded-full bg-white transition-none dark:bg-black"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

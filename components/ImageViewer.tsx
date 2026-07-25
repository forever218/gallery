import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageViewerProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageViewer({ images, initialIndex, onClose }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="关闭"
      >
        <X size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        }}
        className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        aria-label="上一张"
      >
        <ChevronLeft size={32} />
      </button>

      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`图片 ${currentIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        }}
        className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        aria-label="下一张"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}

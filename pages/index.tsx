import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MasonryGrid from '../components/MasonryGrid';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startTime = performance.now();
    fetch('/data/images.json')
      .then(res => res.json())
      .then(data => {
        const endTime = performance.now();
        const loadTime = Math.round(endTime - startTime);
        setImages(data.images);
        setLoading(false);
        
        // 发送自定义事件，通知Layout组件图片已加载
        window.dispatchEvent(new CustomEvent('imagesLoaded', {
          detail: {
            count: data.images.length,
            time: loadTime
          }
        }));
      })
      .catch(error => {
        console.error('加载图片失败:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <p className="text-2xl font-light dark:text-white" style={{ fontFamily: 'Ma Shan Zheng, cursive' }}>
          我想记录的，是这世界的灵魂
        </p>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">加载中...</div>
        </div>
      ) : images.length > 0 ? (
        <MasonryGrid images={images} />
      ) : (
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">
            暂无图片，请在 public/albums 目录下添加相册和图片
          </div>
        </div>
      )}
    </Layout>
  );
}

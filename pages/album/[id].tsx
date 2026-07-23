import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import MasonryGrid from '../../components/MasonryGrid';
import Link from 'next/link';

export default function Album() {
  const router = useRouter();
  const { id } = router.query;
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [albumName, setAlbumName] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetch(`/data/album/${encodeURIComponent(id as string)}.json`)
        .then(res => res.json())
        .then(data => {
          setImages(data.images);
          setAlbumName(data.albumName);
          setLoading(false);
        })
        .catch(error => {
          console.error('加载相册图片失败:', error);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <Layout>
      <div className="mb-8">
        <Link
          href="/albums"
          className="mb-4 inline-block text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          ← 返回相册列表
        </Link>
        <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
          {albumName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          共 {images.length} 张图片
        </p>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">加载中...</div>
        </div>
      ) : images.length > 0 ? (
        <MasonryGrid images={images} albumName={albumName} />
      ) : (
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">
            此相册暂无图片
          </div>
        </div>
      )}
    </Layout>
  );
}

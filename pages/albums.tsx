import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

interface Album {
  name: string;
  imageCount: number;
  coverImage: string | null;
}

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/albums.json')
      .then(res => res.json())
      .then(data => {
        setAlbums(data.albums);
        setLoading(false);
      })
      .catch(error => {
        console.error('加载相册失败:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
          所有相册
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          浏览和选择相册
        </p>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">加载中...</div>
        </div>
      ) : albums.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {albums.map((album) => (
            <Link
              key={album.name}
              href={`/album/${encodeURIComponent(album.name)}`}
              className="group block overflow-hidden rounded-lg bg-gray-100 shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
            >
              <div className="relative aspect-square">
                {album.coverImage ? (
                  <Image
                    src={album.coverImage}
                    alt={album.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    暂无图片
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="mb-1 text-lg font-semibold text-black dark:text-white">
                  {album.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {album.imageCount} 张图片
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">
            暂无相册，请在 public/albums 目录下添加相册文件夹
          </div>
        </div>
      )}
    </Layout>
  );
}

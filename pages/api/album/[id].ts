import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: '无效的相册ID' });
    }

    // 解码 URL 编码的相册名称
    const decodedId = decodeURIComponent(id);
    const albumPath = path.join(process.cwd(), 'public', 'albums', decodedId);

    // 检查相册是否存在
    if (!fs.existsSync(albumPath) || !fs.statSync(albumPath).isDirectory()) {
      return res.status(404).json({ error: '相册不存在' });
    }

    // 获取相册中的所有图片
    const images = fs.readdirSync(albumPath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => `/albums/${decodedId}/${file}`);

    // 随机排序图片
    const shuffledImages = images.sort(() => Math.random() - 0.5);

    res.status(200).json({ 
      albumName: decodedId,
      images: shuffledImages 
    });
  } catch (error) {
    console.error('获取相册图片失败:', error);
    res.status(500).json({ error: '获取相册图片失败' });
  }
}

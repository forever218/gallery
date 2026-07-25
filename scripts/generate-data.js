const fs = require('fs');
const path = require('path');

const albumsDir = path.join(__dirname, '..', 'public', 'albums');
const dataDir = path.join(__dirname, '..', 'public', 'data');

// 清空并重新创建 data 目录
if (fs.existsSync(dataDir)) {
  fs.rmSync(dataDir, { recursive: true });
}
fs.mkdirSync(dataDir, { recursive: true });

// 确保 albums 目录存在
if (!fs.existsSync(albumsDir)) {
  fs.mkdirSync(albumsDir, { recursive: true });
  // 没有相册时写入空数据
  const now = new Date().toISOString();
  fs.writeFileSync(path.join(dataDir, 'images.json'), JSON.stringify({ images: [], lastUpdated: now }));
  fs.writeFileSync(path.join(dataDir, 'albums.json'), JSON.stringify({ albums: [] }));
  console.log('No albums found, generated empty data files.');
  return;
}

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// 获取所有相册（子目录）
const albums = fs.readdirSync(albumsDir).filter(item => {
  const itemPath = path.join(albumsDir, item);
  return fs.statSync(itemPath).isDirectory();
});

const albumDataList = [];
const allImages = [];
let lastUpdated = null;

albums.forEach(albumName => {
  const albumPath = path.join(albumsDir, albumName);
  const imageFiles = fs.readdirSync(albumPath)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

  const images = imageFiles.map(file => `/albums/${albumName}/${file}`);

  // 更新最后修改时间
  imageFiles.forEach(file => {
    const filePath = path.join(albumPath, file);
    const mtime = fs.statSync(filePath).mtimeMs;
    if (lastUpdated === null || mtime > lastUpdated) {
      lastUpdated = mtime;
    }
  });

  // 收集所有图片
  allImages.push(...images);

  // 每个相册的信息
  albumDataList.push({
    name: albumName,
    imageCount: images.length,
    coverImage: images.length > 0 ? images[0] : null,
  });

  // 生成单个相册的 JSON 文件
  const albumDir = path.join(dataDir, 'album');
  if (!fs.existsSync(albumDir)) {
    fs.mkdirSync(albumDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(albumDir, `${albumName}.json`),
    JSON.stringify({
      albumName: albumName,
      images: images.sort(() => Math.random() - 0.5),
    })
  );
  console.log(`Generated data for album: ${albumName} (${images.length} images)`);
});

// 生成所有图片 JSON（随机排序）
fs.writeFileSync(
  path.join(dataDir, 'images.json'),
  JSON.stringify({
    images: allImages.sort(() => Math.random() - 0.5),
    lastUpdated: lastUpdated ? new Date(lastUpdated).toISOString() : new Date().toISOString(),
  })
);

// 生成所有相册 JSON
fs.writeFileSync(
  path.join(dataDir, 'albums.json'),
  JSON.stringify({ albums: albumDataList })
);

console.log(`Data generation complete:`);
console.log(`  - ${allImages.length} total images`);
console.log(`  - ${albumDataList.length} albums`);
console.log(`  - Files written to public/data/`);

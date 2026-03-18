const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.next');

function duplicateRecursive(dir) {
  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    const oldPath = path.join(dir, item);
    
    // 如果是目录，递归进入
    if (fs.statSync(oldPath).isDirectory()) {
      duplicateRecursive(oldPath);
      return;
    }

    // 只处理包含 [ 或 ] 的文件
    if (item.includes('[') || item.includes(']')) {
      const newName = item.replace(/\[/g, '%5B').replace(/\]/g, '%5D');
      const newPath = path.join(dir, newName);
      
      // 复制文件而不是重命名
      fs.copyFileSync(oldPath, newPath);
      console.log(`Copied for CDN: ${item} -> ${newName}`);
    }
  });
}

if (fs.existsSync(buildDir)) {
  console.log('Starting duplication for CDN compatibility...');
  duplicateRecursive(buildDir);
  console.log('Success: Original files kept for Next.js, copies created for EdgeOne.');
}
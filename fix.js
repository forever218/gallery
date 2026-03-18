const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.next');

// 1. 递归重命名文件和文件夹
function renameRecursive(dir) {
  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    const oldPath = path.join(dir, item);
    let newName = item.replace(/\[/g, '%5B').replace(/\]/g, '%5D');
    const newPath = path.join(dir, newName);

    if (fs.statSync(oldPath).isDirectory()) {
      renameRecursive(oldPath);
    }
    
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${item} -> ${newName}`);
    }
  });
}

// 2. 更新所有 JSON 清单文件里的路径字符串
function updateManifests(dir) {
  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      updateManifests(fullPath);
    } else if (item.endsWith('.json')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // 检查内容中是否包含 [id] 这种模式的路径
      if (content.includes('[') || content.includes(']')) {
        // 这里的正则要小心，只替换路径部分，Next.js 的 manifest 通常是相对路径字符串
        const newContent = content.replace(/\[/g, '%5B').replace(/\]/g, '%5D');
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated manifest: ${item}`);
      }
    }
  });
}

if (fs.existsSync(buildDir)) {
  console.log('Starting path fix...');
  renameRecursive(buildDir);
  updateManifests(buildDir);
  console.log('All paths and manifests synced!');
}
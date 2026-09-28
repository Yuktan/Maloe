const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'film/gallery-data.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'film/gallery-data.js' });
const photos = context.window.FILM_GALLERY;

if (!Array.isArray(photos)) throw new Error('胶片清单需要是数组');

const seen = new Set();
for (const photo of photos) {
  if (!photo || typeof photo !== 'object') throw new Error('胶片清单中有无效记录');
  if (!photo.roll || !photo.frame || photo.id !== `${photo.roll}-${photo.frame}`) {
    throw new Error(`照片编号不匹配：${JSON.stringify(photo)}`);
  }
  if (seen.has(photo.id)) throw new Error(`照片编号重复：${photo.id}`);
  seen.add(photo.id);

  for (const size of ['thumb', 'full']) {
    const relative = photo[size];
    const expected = `assets/${size}/${photo.roll}/${photo.frame}.jpg`;
    if (relative !== expected) throw new Error(`${photo.id} 的 ${size} 路径应为 ${expected}`);
    if (!fs.existsSync(path.join(root, 'film', relative))) {
      throw new Error(`${photo.id} 缺少文件：film/${relative}`);
    }
  }
}

const page = fs.readFileSync(path.join(root, 'film/index.html'), 'utf8');
const pageIds = [...page.matchAll(/<figure class="frame"[^>]*data-id="([^"]+)"/g)].map(match => match[1]);
if (pageIds.length !== photos.length || pageIds.some((id, index) => id !== photos[index].id)) {
  throw new Error('影集页面与胶片清单不一致；请运行 npm run sync:film');
}

console.log(`胶片内容检查通过：${photos.length} 张照片，${new Set(photos.map(photo => photo.roll)).size} 卷胶片`);

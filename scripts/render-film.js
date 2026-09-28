const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const htmlFile = path.join(root, 'film/index.html');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'film/gallery-data.js'), 'utf8'), context);
const photos = context.window.FILM_GALLERY;
if (!Array.isArray(photos)) throw new Error('胶片清单需要是数组');

const escape = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const frames = photos.map((photo, index) => {
  const roll = escape(photo.roll);
  const frame = escape(photo.frame);
  const id = escape(photo.id);
  const full = escape(photo.full);
  const thumb = escape(photo.thumb);
  const loading = index < 12 ? 'eager' : 'lazy';
  return `        <figure class="frame" data-roll="${roll}" data-id="${id}"><a class="frame-link" href="${full}" aria-label="查看胶片卷 ${roll}，第 ${frame} 张"><span class="frame-mat"><img src="${thumb}" alt="胶片卷 ${roll}，第 ${frame} 张" width="490" height="650" loading="${loading}" decoding="async"></span></a><figcaption><span>${roll} / ${frame}</span><span>${String(index + 1).padStart(3, '0')}</span></figcaption></figure>`;
}).join('\n');

const start = '<!-- BEGIN_FILM_FRAMES -->';
const end = '<!-- END_FILM_FRAMES -->';
const original = fs.readFileSync(htmlFile, 'utf8');
const begin = original.indexOf(start);
const finish = original.indexOf(end);
if (begin < 0 || finish <= begin) throw new Error('找不到影集照片区域标记');
const updated = original.slice(0, begin + start.length) + '\n' + frames + '\n        ' + original.slice(finish);
fs.writeFileSync(htmlFile, updated);
console.log(`已生成 ${photos.length} 张胶片照片的页面内容`);

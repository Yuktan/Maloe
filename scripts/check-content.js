const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'film/gallery-data.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'film/gallery-data.js' });
const photos = context.window.FILM_GALLERY;
const annualEntries = [
  require('../annual/archive-data/2024'),
  require('../annual/archive-data/2023'),
  require('../annual/archive-data/2021'),
];
const annualYears = ['2025', ...annualEntries.map(entry => entry.year)];

for (const entry of annualEntries) {
  if (!/^20\d{2}$/.test(entry.year) || !entry.sections.length) throw new Error('年度盘点资料无效');
  for (const file of [entry.cover, ...entry.sections.flatMap(section => section.blocks.filter(block => block.type === 'image').map(block => block.file))]) {
    if (!fs.existsSync(path.join(root, 'assets', 'annual', entry.year, file))) throw new Error(`${entry.year} 缺少图片：${file}`);
  }
  for (const value of [entry.title, entry.summary, entry.coverAlt, ...entry.sections.flatMap(section => [section.title, ...section.blocks.flatMap(block => {
    if (block.type === 'image') return [block.alt, ...(block.caption ? [block.caption] : [])];
    if (block.type === 'list' || block.type === 'resources') return block.items;
    return [block.text];
  })])]) {
    for (const locale of ['zh', 'en', 'id']) {
      if (!value || !value[locale]?.trim()) throw new Error(`${entry.year} 缺少 ${locale} 翻译`);
    }
  }
}

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

for (const [locale, prefix] of [['zh-CN', ''], ['en', '/en'], ['id', '/id']]) {
  for (const route of ['/', '/annual/', ...annualYears.map(year => `/annual/${year}/`), '/film/']) {
    const relative = `${prefix}${route}index.html`.replace(/^\//, '');
    const page = fs.readFileSync(path.join(root, relative), 'utf8');
    if (!page.includes(`<html lang="${locale}">`)) throw new Error(`${relative} 的语言标记不匹配`);
    if (/Yudan|鱼蛋/i.test(page)) throw new Error(`${relative} 包含不应公开的个人署名`);
    const brand = locale === 'zh-CN' ? '陆肆捌' : 'Maloe';
    if (!new RegExp(`<a class="journal-brand"[^>]*>${brand}`).test(page)) {
      throw new Error(`${relative} 的博客名称不匹配`);
    }
    if (page.includes('social-preview.png')) throw new Error(`${relative} 仍引用旧分享图`);
    if (!page.includes(`rel="canonical" href="https://maloe.xyz${prefix}${route}"`)) {
      throw new Error(`${relative} 的 canonical 链接不匹配`);
    }
    for (const [language, targetPrefix] of [['zh-CN', ''], ['en', '/en'], ['id', '/id']]) {
      if (!page.includes(`hreflang="${language}" href="https://maloe.xyz${targetPrefix}${route}"`)) {
        throw new Error(`${relative} 缺少 ${language} 语言链接`);
      }
    }
    if (route === '/annual/') {
      for (const year of annualYears) {
        if (!page.includes(`href="${prefix}/annual/${year}/"`)) throw new Error(`${relative} 缺少 ${year} 入口`);
      }
    }
    if (/^\/annual\/20\d{2}\/$/.test(route)) {
      if (!page.includes(`href="${prefix}/annual/"`)) throw new Error(`${relative} 缺少返回年度目录的链接`);
      for (const image of page.matchAll(/<img[^>]+src="(\/assets\/annual\/[^\"]+)"/g)) {
        if (!fs.existsSync(path.join(root, image[1].slice(1)))) throw new Error(`${relative} 图片不存在：${image[1]}`);
      }
    }
    if (route !== '/film/') continue;
    const pageIds = [...page.matchAll(/<figure class="frame"[^>]*data-id="([^"]+)"/g)].map(match => match[1]);
    if (pageIds.length !== photos.length || pageIds.some((id, index) => id !== photos[index].id)) {
      throw new Error(`${relative} 与胶片清单不一致；请运行 npm run sync:film`);
    }
    if (!page.includes('href="/film/assets/full/') || !page.includes('src="/film/assets/thumb/')) {
      throw new Error(`${relative} 的照片链接不是共享绝对路径`);
    }
  }
}

console.log(`内容检查通过：${annualYears.length} 篇三语年度盘点，${photos.length} 张胶片照片，${new Set(photos.map(photo => photo.roll)).size} 卷胶片`);

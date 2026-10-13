const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const entries = [
  require('../annual/archive-data/2024'),
  require('../annual/archive-data/2023'),
  require('../annual/archive-data/2021'),
];
const locales = {
  zh: {
    code: 'zh-CN', prefix: '', brand: '陆肆捌', home: '陆肆捌首页', nav: '网站导航', annual: '年度盘点', film: '胶片影集', products: '许愿开发',
    skip: '跳到正文', breadcrumb: '当前位置', contents: '目录', back: '返回年度盘点', read: '读这一年', years: '历年盘点', footer: '陆肆捌 · 年度盘点',
    year2025: '2025 年终总结', summary2025: '从健康、连结、改变与突破四个词出发，整理这一年的收获、失去与重新出发。',
  },
  en: {
    code: 'en', prefix: '/en', brand: 'Maloe.', home: 'Maloe. home', nav: 'Site navigation', annual: 'Annual Reviews', film: 'Film Archive', products: 'Vibe Coding',
    skip: 'Skip to content', breadcrumb: 'Breadcrumb', contents: 'Contents', back: 'All annual reviews', read: 'Read this year', years: 'Reviews by year', footer: 'Maloe. · Annual Reviews',
    year2025: '2025 Annual Review', summary2025: 'Health, connection, change and breaking through frame a year of gains, losses and fresh starts.',
  },
  id: {
    code: 'id', prefix: '/id', brand: 'Maloe.', home: 'Beranda Maloe.', nav: 'Navigasi situs', annual: 'Catatan Tahunan', film: 'Arsip Film', products: 'Vibe Coding',
    skip: 'Lewati ke konten', breadcrumb: 'Navigasi halaman', contents: 'Daftar isi', back: 'Semua catatan tahunan', read: 'Baca kisah ini', years: 'Catatan menurut tahun', footer: 'Maloe. · Catatan Tahunan',
    year2025: 'Catatan Tahunan 2025', summary2025: 'Kesehatan, hubungan, perubahan, dan terobosan membingkai kisah tentang pencapaian, kehilangan, dan awal yang baru.',
  },
};

const escape = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const local = (value, key) => {
  if (!value || typeof value[key] !== 'string' || !value[key].trim()) throw new Error(`Missing ${key} translation`);
  return escape(value[key]);
};
const photo = (year, file) => `/assets/annual/${year}/${escape(file)}`;

function blockHtml(block, year, key) {
  switch (block.type) {
    case 'p': return `<p>${local(block.text, key)}</p>`;
    case 'quote': return `<blockquote><p>${local(block.text, key)}</p></blockquote>`;
    case 'image': {
      const caption = block.caption ? `<figcaption>${local(block.caption, key)}</figcaption>` : '';
      return `<figure><a class="archive-figure-link" href="${photo(year, block.file)}" target="_blank" rel="noopener"><img src="${photo(year, block.file)}" alt="${local(block.alt, key)}" loading="lazy" decoding="async"></a>${caption}</figure>`;
    }
    case 'list': {
      const tag = block.ordered ? 'ol' : 'ul';
      return `<${tag}>${block.items.map(item => `<li>${local(item, key)}</li>`).join('')}</${tag}>`;
    }
    case 'resources':
      return `<ul class="article-resources">${block.items.map(item => `<li>${local(item, key)}</li>`).join('')}</ul>`;
    default: throw new Error(`Unknown block type: ${block.type}`);
  }
}

function storyHtml(entry, key) {
  const ui = locales[key];
  const route = `/annual/${entry.year}/`;
  const localizedRoute = `${ui.prefix}${route}`;
  const title = local(entry.title, key);
  const summary = local(entry.summary, key);
  const alternates = Object.entries(locales).map(([language, item]) =>
    `<link rel="alternate" hreflang="${item.code}" href="https://maloe.xyz${item.prefix}${route}">`).join('\n  ');
  const switcher = Object.entries(locales).map(([language, item]) =>
    `<a href="${item.prefix}${route}" lang="${item.code}" hreflang="${item.code}"${language === key ? ' aria-current="true"' : ''}>${language === 'zh' ? '中' : language.toUpperCase()}</a>`).join('');
  const links = entry.sections.map(section => `<a href="#${escape(section.id)}">${local(section.title, key)}</a>`).join('');
  const sections = entry.sections.map(section =>
    `<section id="${escape(section.id)}" class="archive-story-section"><p class="archive-section-index">${String(entry.sections.indexOf(section) + 1).padStart(2, '0')}</p><h2>${local(section.title, key)}</h2>${section.blocks.map(block => blockHtml(block, entry.year, key)).join('')}</section>`).join('\n');
  const description = summary.replace(/&#39;/g, "'");
  const brandHtml = key === 'zh' ? '陆肆捌' : 'Maloe<span class="brand-period">.</span>';
  return `<!doctype html>
<html lang="${ui.code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#edf1f0">
  <meta name="description" content="${description}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title} · ${escape(ui.brand)}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="https://maloe.xyz${photo(entry.year, entry.cover)}">
  <link rel="canonical" href="https://maloe.xyz${localizedRoute}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="https://maloe.xyz${route}">
  <link rel="stylesheet" href="/site.css?v=5">
  <link rel="stylesheet" href="/annual/archive.css?v=1">
  <script src="/locale.js" defer></script>
  <title>${title} · ${escape(ui.brand)}</title>
</head>
<body class="journal-page archive-story-page">
  <a class="skip-link" href="#article-content">${ui.skip}</a>
  <header class="journal-header">
    <a class="journal-brand" href="${ui.prefix}/" aria-label="${ui.home}">${brandHtml}</a>
    <nav class="journal-nav" aria-label="${ui.nav}"><a href="${ui.prefix}/annual/" aria-current="page">${ui.annual}</a><a href="${ui.prefix}/film/">${ui.film}</a><a href="${ui.prefix}/products/">${ui.products}</a></nav>
    <nav class="language-switcher" aria-label="语言 / Language / Bahasa">${switcher}</nav>
  </header>
  <main class="archive-story-main" id="article-content">
    <nav class="archive-breadcrumb" aria-label="${ui.breadcrumb}"><a href="${ui.prefix}/annual/">${ui.annual}</a><span aria-hidden="true">/</span><span>${entry.year}</span></nav>
    <header class="archive-story-hero"><h1>${title}</h1><p class="archive-dek">${summary}</p></header>
    <div class="archive-story-layout">
      <aside class="archive-toc"><p>${ui.contents}</p><nav aria-label="${ui.contents}">${links}</nav></aside>
      <article class="archive-prose">${sections}</article>
    </div>
    <a class="archive-back" href="${ui.prefix}/annual/">← ${ui.back}</a>
  </main>
  <footer class="journal-footer"><span>${ui.footer}</span><a href="${ui.prefix}/annual/">${ui.back}</a></footer>
</body>
</html>
`;
}

function yearListHtml(key) {
  const ui = locales[key];
  const coverAlt2025 = { zh: '雅加达日落与城市剪影', en: 'Sunset over the Jakarta skyline', id: 'Senja di atas kota Jakarta' };
  const items = [{ year: '2025', title: { [key]: ui.year2025 }, summary: { [key]: ui.summary2025 }, cover: '/assets/jakarta-sunset.webp', coverAlt: coverAlt2025 }, ...entries];
  return items.map(entry => {
    const title = local(entry.title, key);
    const cover = entry.year === '2025' ? entry.cover : photo(entry.year, entry.cover);
    return `      <a class="year-entry" href="${ui.prefix}/annual/${entry.year}/" aria-label="${ui.read}: ${title}">
        <span class="year-entry-number">${entry.year}</span>
        <img src="${cover}" alt="${local(entry.coverAlt || { [key]: title }, key)}" loading="lazy">
        <div class="year-entry-body"><h2>${title}</h2><p>${local(entry.summary, key)}</p><span aria-hidden="true">↗</span></div>
      </a>`;
  }).join('\n');
}

for (const entry of entries) {
  for (const key of Object.keys(locales)) {
    const prefix = locales[key].prefix.replace(/^\//, '');
    const file = path.join(root, prefix, 'annual', entry.year, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, storyHtml(entry, key));
  }
}
for (const [key, ui] of Object.entries(locales)) {
  const file = path.join(root, ui.prefix.replace(/^\//, ''), 'annual', 'index.html');
  const original = fs.readFileSync(file, 'utf8');
  const yearListPattern = /(<section class="year-list"[^>]*>).*?(<\/section>)/s;
  if (!yearListPattern.test(original)) throw new Error(`Cannot find year list in ${file}`);
  const updated = original.replace(yearListPattern, `$1\n${yearListHtml(key)}\n    $2`);
  fs.writeFileSync(file, updated);
}
console.log(`Rendered ${entries.length} historical annual reviews in three languages`);

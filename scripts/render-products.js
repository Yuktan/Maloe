const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const locale = {
  zh: {
    lang: 'zh-CN', prefix: '', brand: '陆肆捌', brandHtml: '陆肆捌', home: '陆肆捌首页', nav: '网站导航',
    annual: '年度盘点', film: '胶片影集', products: '我的产品', skip: '跳到正文', view: '了解产品',
    hubKicker: '做出来，给生活用', hubTitle: '我的产品',
    hubLead: '除了记录生活，我也喜欢把一些反复遇到的小麻烦，做成真正能用的工具。这里收着我做的产品和正在打磨的想法。',
    hubRestory: '把一年的零散片段，重新讲成一个故事。',
    hubFilmcut: '让双画幅胶片扫描件，变成排好顺序的单张照片。',
    hubFooter: '两个产品，两种整理记忆的方式。',
    example: '交互演示 · 示例内容', demoTitle: '看看它怎样工作', pause: '暂停演示', play: '继续演示',
    back: '返回所有产品', also: '再看看', madeFor: '为这样的时刻而做',
    restory: {
      kind: 'Mac 应用 · 年度影像', title: '把一年，重新讲一遍。',
      lead: 'RE:Story 从你导出的 Instagram Stories 出发，把零散的照片、视频和文字整理成一篇年度故事与两版竖屏影片。做完以后，随时回来看看那一年。',
      demoIntro: '从归档到作品，下面用示例内容走一遍主要流程。演示是为网页制作的界面示意。',
      steps: ['导入', '整理', '成片'], stepDetails: ['选择自己的 Stories 归档和年份。', '把片段串成有章节的年度回顾。', '得到回顾页面和两种影片剪辑。'],
      features: [
        ['01', '从自己的素材开始', '导入 Instagram 官方导出包，选好年份。默认仅在这台 Mac 上保存和制作。'],
        ['02', '从片段里找到故事', '不只是按日期排照片，也试着找出这一年反复出现的人、地方与变化。'],
        ['03', '留下一份能重看的作品', '做成可阅读的回顾页面，以及两版节奏不同的竖屏影片。'],
      ],
      madeForText: '给手机相册里有很多生活片段，却一直没时间重新整理的人。',
      ui: { library: '我的作品', create: '制作盘点', import: '导入 Instagram 归档', archive: '2025 年的 Stories.zip', year: '选择年份', ready: '准备制作', organize: '正在整理这一年', chapter1: '春天', chapter2: '夏天', chapter3: '秋天', chapter4: '冬天', result: '你的年度故事', editA: '影片版本 A', editB: '影片版本 B', page: '回顾页面', done: '已完成' },
    },
    filmcut: {
      kind: 'Mac 应用 · 胶片整理', title: '让双画幅，回到一张张照片。',
      lead: 'Filmcut 读取胶片扫描文件夹，识别每卷、跳过重复文件，把一张双画幅扫描件从中间分开，再按卷从 000001 开始编号。离线完成，原图保留。',
      demoIntro: '从原始扫描到独立照片，演示展示了 Filmcut 的核心处理过程。画面使用示例照片。',
      steps: ['选择文件夹', '识别与分幅', '整理完成'], stepDetails: ['把一卷或整个胶片归档拖入。', '检查重复文件，预览左右画幅。', '按卷建立文件夹，从 000001 开始编号。'],
      features: [
        ['01', '一卷一卷认出来', '把散在归档中的扫描件按文件夹识别成不同胶片卷，重复内容只保留一份。'],
        ['02', '左右两张自动分开', '沿扫描件的中线分成两张，处理前能看到左右分幅预览。'],
        ['03', '重新排好顺序', '每卷独立建档，从 000001 开始编号。也可以保持应用运行，等新扫描件出现时继续处理。'],
      ],
      madeForText: '给把半格胶片送去扫描后，还想认真保存、挑选和分享每一张照片的人。',
      ui: { source: '来源', folder: '胶片扫描文件夹', files: '24 张扫描件 · 1 卷', choose: '选择文件夹', preview: '分幅预览', split: '沿中线分为左右画幅', dedupe: '已跳过重复文件', output: '整理完成', roll: '胶片卷 5203', first: '000001.JPG', second: '000002.JPG', offline: '完全离线 · 原图保留' },
    },
  },
  en: {
    lang: 'en', prefix: '/en', brand: 'Maloe.', brandHtml: 'Maloe<span class="brand-period">.</span>', home: 'Maloe. home', nav: 'Site navigation',
    annual: 'Annual Reviews', film: 'Film Archive', products: 'Products', skip: 'Skip to content', view: 'Explore product',
    hubKicker: 'Made to be used', hubTitle: 'Things I make',
    hubLead: 'I like turning the small problems I keep running into into tools I can actually use. Here are the products I’ve made and the ideas I’m still working on.',
    hubRestory: 'Turn scattered moments from a year into a story worth revisiting.',
    hubFilmcut: 'Turn half-frame film scans into neatly numbered individual photos.',
    hubFooter: 'Two products, two ways to make memories easier to keep.',
    example: 'Interactive demo · sample content', demoTitle: 'See how it works', pause: 'Pause demo', play: 'Play demo',
    back: 'Back to all products', also: 'See also', madeFor: 'Made for moments like this',
    restory: {
      kind: 'Mac app · year in pictures', title: 'Tell the story of your year again.',
      lead: 'RE:Story starts with your exported Instagram Stories and turns scattered photos, videos, and words into an annual story and two vertical film edits. A way to come back to that year whenever you want.',
      demoIntro: 'Follow the main flow from archive to finished story. This is a website demo with sample content.',
      steps: ['Import', 'Find the story', 'Watch it'], stepDetails: ['Choose your Stories archive and a year.', 'Bring the moments together in chapters.', 'Get a recap page and two film edits.'],
      features: [
        ['01', 'Start with your own moments', 'Import the official Instagram export and pick a year. By default, the work stays on your Mac.'],
        ['02', 'Find the thread', 'Go beyond a date-sorted slideshow to find the people, places, and changes that kept showing up.'],
        ['03', 'Make something to revisit', 'Keep a readable recap page and two vertical films with different pacing.'],
      ],
      madeForText: 'For anyone with a phone full of little moments and no time to put them together.',
      ui: { library: 'My stories', create: 'Create', import: 'Import Instagram archive', archive: 'Stories from 2025.zip', year: 'Choose year', ready: 'Ready to create', organize: 'Putting the year together', chapter1: 'Spring', chapter2: 'Summer', chapter3: 'Autumn', chapter4: 'Winter', result: 'Your year in stories', editA: 'Film edit A', editB: 'Film edit B', page: 'Recap page', done: 'Finished' },
    },
    filmcut: {
      kind: 'Mac app · film workflow', title: 'Give every half-frame its own place.',
      lead: 'Filmcut reads your scan folders, finds each roll, skips duplicates, splits every double frame down the middle, and numbers the results from 000001 for each roll. It works offline and keeps the originals.',
      demoIntro: 'From a raw scan to two individual photos. This demo uses sample images to show the core workflow.',
      steps: ['Choose a folder', 'Find and split', 'File away'], stepDetails: ['Drop in one roll or the whole archive.', 'Skip duplicates and preview both halves.', 'Get a folder per roll, numbered from 000001.'],
      features: [
        ['01', 'Find every roll', 'Treat folders of scans as separate rolls and ignore identical copies along the way.'],
        ['02', 'Split left and right', 'Cut each double frame at its exact center, with a preview of both resulting photos.'],
        ['03', 'Keep it in order', 'Create a folder for each roll and start numbering at 000001. Leave the app running to process new scans later.'],
      ],
      madeForText: 'For half-frame photographers who want every scan ready to keep, pick, and share.',
      ui: { source: 'Source', folder: 'Film scans folder', files: '24 scans · 1 roll', choose: 'Choose folder', preview: 'Split preview', split: 'Divide at the center line', dedupe: 'Duplicates skipped', output: 'All filed away', roll: 'Film roll 5203', first: '000001.JPG', second: '000002.JPG', offline: 'Fully offline · originals kept' },
    },
  },
  id: {
    lang: 'id', prefix: '/id', brand: 'Maloe.', brandHtml: 'Maloe<span class="brand-period">.</span>', home: 'Beranda Maloe.', nav: 'Navigasi situs',
    annual: 'Catatan Tahunan', film: 'Arsip Film', products: 'Produk', skip: 'Lewati ke konten', view: 'Lihat produk',
    hubKicker: 'Dibuat untuk dipakai', hubTitle: 'Yang kubuat',
    hubLead: 'Aku suka mengubah masalah kecil yang sering kutemui menjadi alat yang benar-benar bisa kupakai. Di sini ada produk yang sudah kubuat dan ide yang masih terus kukerjakan.',
    hubRestory: 'Rangkai potongan momen selama setahun menjadi cerita yang ingin dilihat lagi.',
    hubFilmcut: 'Ubah hasil scan film half-frame menjadi foto satuan yang rapi dan bernomor.',
    hubFooter: 'Dua produk, dua cara untuk merapikan kenangan.',
    example: 'Demo interaktif · contoh isi', demoTitle: 'Lihat cara kerjanya', pause: 'Jeda demo', play: 'Putar demo',
    back: 'Kembali ke semua produk', also: 'Lihat juga', madeFor: 'Dibuat untuk momen seperti ini',
    restory: {
      kind: 'Aplikasi Mac · cerita setahun', title: 'Ceritakan lagi tahunmu.',
      lead: 'RE:Story memakai arsip Instagram Stories yang kamu ekspor untuk merangkai foto, video, dan tulisan menjadi cerita tahunan serta dua versi video vertikal. Jadi, kamu bisa kembali ke tahun itu kapan saja.',
      demoIntro: 'Ikuti alur dari arsip sampai cerita selesai. Ini demo di situs dengan contoh isi.',
      steps: ['Masukkan arsip', 'Rangkai cerita', 'Tonton hasil'], stepDetails: ['Pilih arsip Stories dan tahunnya.', 'Susun momen menjadi beberapa bab.', 'Dapatkan halaman cerita dan dua versi video.'],
      features: [
        ['01', 'Mulai dari momenmu sendiri', 'Masukkan arsip resmi dari Instagram dan pilih tahun. Secara bawaan, semuanya dikerjakan dan disimpan di Mac milikmu.'],
        ['02', 'Cari benang ceritanya', 'Bukan sekadar menampilkan foto menurut tanggal, tapi mencari orang, tempat, dan perubahan yang terus muncul.'],
        ['03', 'Simpan untuk dilihat lagi', 'Hasilnya berupa halaman cerita yang enak dibaca dan dua video vertikal dengan ritme berbeda.'],
      ],
      madeForText: 'Buat kamu yang punya banyak momen kecil di ponsel, tapi belum sempat merangkainya.',
      ui: { library: 'Ceritaku', create: 'Buat cerita', import: 'Masukkan arsip Instagram', archive: 'Stories 2025.zip', year: 'Pilih tahun', ready: 'Siap dibuat', organize: 'Merangkai momen setahun', chapter1: 'Musim semi', chapter2: 'Musim panas', chapter3: 'Musim gugur', chapter4: 'Musim dingin', result: 'Cerita setahunmu', editA: 'Video versi A', editB: 'Video versi B', page: 'Halaman cerita', done: 'Selesai' },
    },
    filmcut: {
      kind: 'Aplikasi Mac · arsip film', title: 'Satu frame, satu foto yang rapi.',
      lead: 'Filmcut membaca folder hasil scan, mengenali setiap rol, melewati file duplikat, membagi tiap gambar dua frame di tengah, lalu memberi nomor dari 000001 untuk setiap rol. Semuanya berjalan offline dan file asli tetap ada.',
      demoIntro: 'Dari hasil scan mentah menjadi dua foto terpisah. Demo ini memakai gambar contoh untuk memperlihatkan alurnya.',
      steps: ['Pilih folder', 'Kenali & bagi', 'Simpan rapi'], stepDetails: ['Masukkan satu rol atau seluruh arsip.', 'Lewati duplikat dan lihat kedua frame.', 'Buat folder per rol, bernomor mulai 000001.'],
      features: [
        ['01', 'Kenali setiap rol', 'Folder berisi hasil scan dikenali sebagai rol terpisah, sementara salinan yang sama dilewati.'],
        ['02', 'Pisahkan kiri dan kanan', 'Setiap gambar dua frame dibagi tepat di tengah, dengan pratinjau hasilnya.'],
        ['03', 'Urutkan kembali', 'Buat folder untuk tiap rol dan mulai penomoran dari 000001. Biarkan aplikasi berjalan untuk memproses scan baru nanti.'],
      ],
      madeForText: 'Buat pemotret half-frame yang ingin setiap hasil scan siap disimpan, dipilih, dan dibagikan.',
      ui: { source: 'Sumber', folder: 'Folder hasil scan', files: '24 scan · 1 rol', choose: 'Pilih folder', preview: 'Pratinjau pembagian', split: 'Bagi tepat di garis tengah', dedupe: 'Duplikat dilewati', output: 'Selesai dirapikan', roll: 'Rol film 5203', first: '000001.JPG', second: '000002.JPG', offline: 'Sepenuhnya offline · file asli tetap ada' },
    },
  },
};

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const route = (item, suffix = '') => `${item.prefix}/products/${suffix}`;
const mark = slug => `/assets/products/${slug === 'restory' ? 'restory-mark.png' : 'filmcut-mark.png'}`;

function shell(key, suffix, title, description, body, image) {
  const c = locale[key];
  const current = route(c, suffix);
  const alternates = Object.values(locale).map(item => `<link rel="alternate" hreflang="${item.lang}" href="https://maloe.xyz${route(item, suffix)}">`).join('\n  ');
  const languages = Object.values(locale).map(item => `<a href="${route(item, suffix)}" lang="${item.lang}" hreflang="${item.lang}"${item === c ? ' aria-current="true"' : ''}>${item.lang === 'zh-CN' ? '中' : item.lang.toUpperCase()}</a>`).join('');
  return `<!doctype html>
<html lang="${c.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#edf1f0">
  <meta name="description" content="${escape(description)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)} · ${escape(c.brand)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:image" content="https://maloe.xyz${image}">
  <link rel="canonical" href="https://maloe.xyz${current}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="https://maloe.xyz/products/${suffix}">
  <link rel="stylesheet" href="/site.css?v=4">
  <link rel="stylesheet" href="/products/products.css?v=1">
  <script src="/locale.js" defer></script>
${suffix ? '  <script src="/products/demo.js?v=1" defer></script>' : ''}
  <title>${escape(title)} · ${escape(c.brand)}</title>
</head>
<body class="journal-page products-page">
  <a class="skip-link" href="#main-content">${escape(c.skip)}</a>
  <header class="journal-header">
    <a class="journal-brand" href="${c.prefix}/" aria-label="${escape(c.home)}">${c.brandHtml}</a>
    <nav class="journal-nav" aria-label="${escape(c.nav)}"><a href="${c.prefix}/annual/">${escape(c.annual)}</a><a href="${c.prefix}/film/">${escape(c.film)}</a><a href="${route(c)}" aria-current="page">${escape(c.products)}</a></nav>
    <nav class="language-switcher" aria-label="语言 / Language / Bahasa">${languages}</nav>
  </header>
  <main id="main-content">${body}</main>
  <footer class="journal-footer"><span>${escape(c.brand)} · ${escape(c.products)}</span><a href="${c.prefix}/">${escape(c.home)}</a></footer>
</body>
</html>
`;
}

function productCard(c, slug) {
  const p = c[slug];
  const isFilm = slug === 'filmcut';
  const preview = isFilm
    ? `<div class="product-card-filmstrip"><img src="/film/assets/thumb/5203/000012.jpg" alt="" loading="lazy"><img src="/film/assets/thumb/00000399/000019.jpg" alt="" loading="lazy"><span class="product-card-cut" aria-hidden="true"></span></div>`
    : `<div class="product-card-story"><div class="product-card-story-cover"><img src="/assets/jakarta-sunset.webp" alt="" loading="lazy"></div><div class="product-card-story-copy"><span>2025</span><span>01 / 04</span><span>RE:Story</span></div></div>`;
  return `<a class="product-card product-card--${slug}" href="${route(c, slug + '/')}">
    <div class="product-card-copy"><div class="product-card-heading"><img src="${mark(slug)}" alt="" width="54" height="54"><div><span>${escape(p.kind)}</span><h2>${isFilm ? 'Filmcut' : 'RE:Story'}</h2></div></div><p>${escape(isFilm ? c.hubFilmcut : c.hubRestory)}</p><span class="product-card-link">${escape(c.view)} <span aria-hidden="true">↗</span></span></div>
    <div class="product-card-art" aria-hidden="true">${preview}</div>
  </a>`;
}

function hub(key) {
  const c = locale[key];
  const body = `<header class="products-hub-hero"><p class="journal-kicker">${escape(c.hubKicker)}</p><h1>${escape(c.hubTitle)}</h1><p>${escape(c.hubLead)}</p></header>
  <section class="product-collection" aria-label="${escape(c.products)}">${productCard(c, 'restory')}${productCard(c, 'filmcut')}</section>
  <p class="products-hub-footer">${escape(c.hubFooter)}</p>`;
  return shell(key, '', c.hubTitle, c.hubLead, body, mark('restory'));
}

function restoryStage(c, index) {
  const u = c.restory.ui;
  if (index === 0) return `<div class="restory-demo-panel restory-demo-import"><div class="restory-demo-panel-top"><span>${escape(u.create)}</span><span>2025</span></div><div class="restory-demo-import-card"><img src="${mark('restory')}" alt=""><strong>${escape(u.import)}</strong><span>${escape(u.archive)}</span><div class="restory-demo-chip-row"><em>${escape(u.year)} · 2025</em><em>${escape(u.ready)} ✓</em></div></div></div>`;
  if (index === 1) return `<div class="restory-demo-panel restory-demo-chapters"><div class="restory-demo-panel-top"><span>${escape(u.organize)}</span><span>04 / 04</span></div><div class="restory-chapter-grid">${[u.chapter1,u.chapter2,u.chapter3,u.chapter4].map((name, i) => `<div class="restory-chapter restory-chapter--${i + 1}"><span>0${i + 1}</span><strong>${escape(name)}</strong></div>`).join('')}</div><div class="restory-demo-progress"><span></span></div></div>`;
  return `<div class="restory-demo-panel restory-demo-result"><div class="restory-demo-panel-top"><span>${escape(u.result)}</span><span>${escape(u.done)} ✓</span></div><div class="restory-result-grid"><div class="restory-result-film"><img src="/assets/jakarta-sunset.webp" alt=""><span>${escape(u.editA)}</span></div><div class="restory-result-film"><img src="/film/assets/thumb/5203/000012.jpg" alt=""><span>${escape(u.editB)}</span></div><div class="restory-result-page"><span>2025</span><strong>${escape(u.page)}</strong><i></i><i></i><i></i></div></div></div>`;
}

function filmcutStage(c, index) {
  const u = c.filmcut.ui;
  if (index === 0) return `<div class="filmcut-demo-panel filmcut-demo-import"><div class="filmcut-demo-drop"><span class="filmcut-folder-icon" aria-hidden="true">▤</span><strong>${escape(u.folder)}</strong><span>${escape(u.files)}</span><em>${escape(u.choose)} ↗</em></div><div class="filmcut-demo-small"><span>${escape(u.source)}</span><b>${escape(u.offline)}</b></div></div>`;
  if (index === 1) return `<div class="filmcut-demo-panel filmcut-demo-split"><div class="filmcut-demo-panel-top"><strong>${escape(u.preview)}</strong><span>${escape(u.dedupe)} ✓</span></div><div class="filmcut-double-frame"><img src="/film/assets/thumb/5203/000012.jpg" alt=""><img src="/film/assets/thumb/00000399/000019.jpg" alt=""><i class="filmcut-scan-beam" aria-hidden="true"></i></div><p>${escape(u.split)}</p></div>`;
  return `<div class="filmcut-demo-panel filmcut-demo-output"><div class="filmcut-demo-panel-top"><strong>${escape(u.output)}</strong><span>${escape(u.roll)}</span></div><div class="filmcut-output-grid"><div><img src="/film/assets/thumb/5203/000012.jpg" alt=""><span>${escape(u.first)}</span></div><div><img src="/film/assets/thumb/00000399/000019.jpg" alt=""><span>${escape(u.second)}</span></div></div></div>`;
}

function demo(c, slug) {
  const p = c[slug];
  const stage = slug === 'restory' ? restoryStage : filmcutStage;
  const windowNav = slug === 'restory' ? `<span>${escape(p.ui.library)}</span><b>${escape(p.ui.create)}</b>` : `<span>${escape(p.ui.source)}</span><b>${escape(p.ui.preview)}</b>`;
  return `<section class="product-demo-section" id="demo" aria-labelledby="demo-title"><div class="product-section-heading"><p class="journal-kicker">01 / DEMO</p><h2 id="demo-title">${escape(c.demoTitle)}</h2><p>${escape(p.demoIntro)}</p></div>
    <div class="product-demo" data-demo="${slug}" data-pause-label="${escape(c.pause)}" data-play-label="${escape(c.play)}">
      <div class="product-demo-steps" role="group" aria-label="${escape(c.demoTitle)}">${p.steps.map((label, i) => `<button type="button" data-step="${i}" aria-pressed="${i === 0}"${i === 0 ? ' class="is-active"' : ''}><span>0${i + 1}</span>${escape(label)}</button>`).join('')}<button class="product-demo-toggle" type="button" data-toggle aria-label="${escape(c.pause)}" title="${escape(c.pause)}">Ⅱ</button></div>
      <div class="product-demo-window"><div class="product-demo-window-bar"><span class="window-lights" aria-hidden="true"><i></i><i></i><i></i></span><span>${slug === 'restory' ? 'RE:Story' : 'Filmcut'}</span><span class="window-dots" aria-hidden="true">···</span></div><div class="product-demo-window-body"><div class="product-demo-sidebar"><img src="${mark(slug)}" alt=""><div>${windowNav}</div><small>${escape(c.example)}</small></div><div class="product-demo-canvas">${p.steps.map((_, i) => `<div class="product-demo-stage${i === 0 ? ' is-active' : ''}" data-stage="${i}"${i === 0 ? '' : ' hidden'}>${stage(c, i)}</div>`).join('')}</div></div></div>
      <p class="product-demo-caption">${p.stepDetails.map((text, i) => `<span data-caption="${i}"${i === 0 ? '' : ' hidden'}>${escape(text)}</span>`).join('')}</p>
    </div>
  </section>`;
}

function detail(key, slug) {
  const c = locale[key];
  const p = c[slug];
  const other = slug === 'restory' ? 'filmcut' : 'restory';
  const name = slug === 'restory' ? 'RE:Story' : 'Filmcut';
  const otherName = other === 'restory' ? 'RE:Story' : 'Filmcut';
  const body = `<nav class="product-breadcrumb" aria-label="${escape(c.products)}"><a href="${route(c)}">${escape(c.products)}</a><span aria-hidden="true">/</span><span>${name}</span></nav>
  <header class="product-detail-hero product-detail-hero--${slug}"><div class="product-detail-copy"><div class="product-detail-identity"><img src="${mark(slug)}" alt="" width="64" height="64"><span>${name}</span></div><p class="journal-kicker">${escape(p.kind)}</p><h1>${escape(p.title)}</h1><p class="product-detail-lead">${escape(p.lead)}</p><a class="primary-link" href="#demo">${escape(c.demoTitle)} <span aria-hidden="true">↓</span></a></div><div class="product-detail-art" aria-hidden="true">${slug === 'restory' ? `<div class="product-detail-poster"><img src="/assets/jakarta-sunset.webp" alt=""><span>2025</span><strong>RE:Story</strong></div>` : `<div class="product-detail-split-art"><img src="/film/assets/thumb/5203/000012.jpg" alt=""><img src="/film/assets/thumb/00000399/000019.jpg" alt=""><span></span></div>`}</div></header>
  ${demo(c, slug)}
  <section class="product-features" aria-label="${escape(name)}"><div class="product-section-heading"><p class="journal-kicker">02 / ${escape(name)}</p><h2>${escape(c.madeFor)}</h2></div><div class="product-feature-grid">${p.features.map(([number, title, text]) => `<article><span>${number}</span><h3>${escape(title)}</h3><p>${escape(text)}</p></article>`).join('')}</div><p class="product-made-for">${escape(p.madeForText)}</p></section>
  <aside class="product-next"><div><span>${escape(c.also)}</span><h2>${otherName}</h2><p>${escape(other === 'filmcut' ? c.hubFilmcut : c.hubRestory)}</p></div><a href="${route(c, other + '/')}">${escape(c.view)} <span aria-hidden="true">↗</span></a></aside>
  <a class="product-back" href="${route(c)}">← ${escape(c.back)}</a>`;
  return shell(key, `${slug}/`, `${name} · ${p.title}`, p.lead, body, mark(slug));
}

for (const key of Object.keys(locale)) {
  const c = locale[key];
  for (const [suffix, html] of [['', hub(key)], ['restory/', detail(key, 'restory')], ['filmcut/', detail(key, 'filmcut')]]) {
    const file = path.join(root, c.prefix.slice(1), 'products', suffix, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
  }
}
console.log('Rendered product pages in Chinese, English, and Indonesian');

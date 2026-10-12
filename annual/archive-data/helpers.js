const t = (zh, en, id) => ({ zh, en, id });
const p = (zh, en, id) => ({ type: 'p', text: t(zh, en, id) });
const quote = (zh, en, id) => ({ type: 'quote', text: t(zh, en, id) });
const image = (file, alt, caption) => ({ type: 'image', file, alt, caption });
const list = (items, ordered = false) => ({ type: 'list', items, ordered });
const resources = items => ({ type: 'resources', items });
const section = (id, title, blocks) => ({ id, title, blocks });
module.exports = { t, p, quote, image, list, resources, section };

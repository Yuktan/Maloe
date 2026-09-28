const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.vtt': 'text/vtt; charset=utf-8',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
};

http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  if (pathname.split('/').some(segment => segment.startsWith('.'))) {
    response.writeHead(404).end();
    return;
  }
  const requested = path.resolve(root, '.' + pathname);
  if (requested !== root && !requested.startsWith(root + path.sep)) {
    response.writeHead(403).end();
    return;
  }
  let file = requested;
  let stat;
  try {
    if (fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith('/')) {
        const url = new URL(request.url, 'http://localhost');
        response.writeHead(308, { Location: `${url.pathname}/${url.search}` }).end();
        return;
      }
      file = path.join(file, 'index.html');
    }
    stat = fs.statSync(file);
    if (!stat.isFile()) throw new Error('Missing file');
  } catch {
    response.writeHead(404).end();
    return;
  }
  const extension = path.extname(file).toLowerCase();
  const cacheableMedia = ['.mp4', '.mov', '.webm', '.vtt'].includes(extension);
  const headers = {
    'Content-Type': types[extension] || 'application/octet-stream',
    'Cache-Control': file.includes(path.sep + 'assets' + path.sep) || cacheableMedia ? 'public, max-age=3600' : 'no-store',
    'Accept-Ranges': 'bytes',
    'X-Content-Type-Options': 'nosniff',
  };
  if (stat.size === 0) {
    if (request.headers.range) response.writeHead(416, { 'Content-Range': 'bytes */0' }).end();
    else response.writeHead(200, { ...headers, 'Content-Length': 0 }).end();
    return;
  }
  let start = 0;
  let end = stat.size - 1;
  let status = 200;
  if (request.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
    if (match && (match[1] || match[2])) {
      if (match[1]) {
        start = Number(match[1]);
        if (match[2]) end = Number(match[2]);
      } else {
        start = Math.max(0, stat.size - Number(match[2]));
      }
      if (Number.isSafeInteger(start) && Number.isSafeInteger(end) && start <= end && start < stat.size) {
        end = Math.min(end, stat.size - 1);
        status = 206;
        headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
      } else {
        response.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end();
        return;
      }
    } else {
      response.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }).end();
      return;
    }
  }
  headers['Content-Length'] = end - start + 1;
  response.writeHead(status, headers);
  if (request.method === 'HEAD') response.end();
  else fs.createReadStream(file, { start, end }).pipe(response);
}).listen(Number(process.env.PORT) || 3000, '0.0.0.0');

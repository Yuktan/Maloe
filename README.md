# YudanWeb

[maloe.xyz](https://maloe.xyz) 的统一网站仓库，包含年终手记首页和[胶片选集](https://maloe.xyz/film/)。首页的页面、脚本、样式和 `assets/` 原本来自 [s0s0/YudanWeb](https://github.com/s0s0/YudanWeb)，在此基础上加入了胶片选集。旧仓库中的首页文件与这里的对应文件已对照：`app.js` 和 `assets/` 完全一致，`index.html` 与 `styles.css` 仅增加胶片入口。

从现在起，网站页面和资源统一在本仓库维护。首页文件位于根目录，胶片图集位于 `film/`；`server.js` 同时提供这两个页面。

运行需要 Node.js 18 或更新版本：

```sh
npm start
```

开发时可运行 `npm run dev`，提交前用 `npm run check` 检查脚本语法。

服务使用 `PORT` 环境变量，未设置时监听 3000 端口。`film/assets/` 中是供网页使用的缩略图和大图，不包含原始扫描文件。

推送到 `main` 分支后，GitHub Actions 会先检查代码，再自动发布到 Railway 的 YudanWeb 生产环境；也可以在 Actions 页面手动运行 `Publish YudanWeb`。旧仓库不再作为发布来源。

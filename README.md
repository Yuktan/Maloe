# YudanWeb

[maloe.xyz](https://maloe.xyz) 的网站源文件，包含年终手记首页和[胶片选集](https://maloe.xyz/film/)。胶片选集按卷筛选，每页显示 12 张照片，并提供大图浏览。

运行需要 Node.js 18 或更新版本：

```sh
npm start
```

服务使用 `PORT` 环境变量，未设置时监听 3000 端口。`film/assets/` 中是供网页使用的缩略图和大图，不包含原始扫描文件。

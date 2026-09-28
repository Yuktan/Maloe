# Maloe

[maloe.xyz](https://maloe.xyz) 的统一仓库。网站以个人博客为入口，现有两条内容线：每年的年度盘点，以及随时更新的胶片影集。

| 地址 | 内容 | 对应文件 |
| --- | --- | --- |
| `/` | 博客首页 | `index.html` |
| `/annual/` | 年度盘点目录 | `annual/index.html` |
| `/annual/2025/` | 2025 全文 | `annual/2025/index.html` |
| `/film/` | 可筛选、分页的大图影集 | `film/index.html`、`film/gallery-data.js` |

原 [s0s0/YudanWeb](https://github.com/s0s0/YudanWeb) 的 2025 全文、脚本、样式和 `assets/` 已保留在本仓库；以后只在这里修改和发布。旧首页的章节书签会转到 `/annual/2025/`。

## 更新内容

- **新增年度盘点：**在 `annual/年份/` 下建立页面。文章可以使用普通 HTML 的 `<figure>`、`<img>` 和带 `controls` 的 `<video>` 来放文字、照片与视频，再在首页和 `annual/index.html` 加入入口。媒体文件放在 `assets/` 或该年度目录下；视频建议用 MP4，并为有对白的视频提供字幕文件。
- **新增胶片照片：**将网页尺寸的大图与缩略图分别放到 `film/assets/full/胶片卷/` 和 `film/assets/thumb/胶片卷/`，然后在 `film/gallery-data.js` 追加一条同格式记录。照片数量、卷数、筛选项和分页会自动更新。仓库不存原始扫描文件。

运行需要 Node.js 18 或更新版本：

```sh
npm run dev
```

`npm run check` 检查脚本语法、照片编号和文件是否齐全。服务使用 `PORT` 环境变量，未设置时监听 3000 端口。

推送到 `main` 后，GitHub Actions 先检查代码，再自动发布到 Railway 的 YudanWeb 生产环境；也可以在 Actions 页面手动运行 `Publish YudanWeb`。设计方向和页面规范见 [DESIGN.md](DESIGN.md)。

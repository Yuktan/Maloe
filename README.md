# 陆肆捌 / Maloe.

[maloe.xyz](https://maloe.xyz) 的统一仓库：[Yuktan/Maloe](https://github.com/Yuktan/Maloe)。博客中文名为「陆肆捌」，英文名与公开网络署名为「Maloe.」，网站内容不使用真实姓名。现有三栏：年度盘点、胶片影集、许愿开发（英语和印尼语栏目名均为 Vibe Coding）。

| 地址 | 内容 | 对应文件 |
| --- | --- | --- |
| `/` | 博客首页 | `index.html` |
| `/annual/` | 年度盘点目录 | `annual/index.html` |
| `/annual/2021/`、`/annual/2023/`、`/annual/2024/`、`/annual/2025/` | 历年全文 | `annual/年份/index.html` |
| `/film/` | 可筛选、分页的大图影集 | `film/index.html`、`film/gallery-data.js` |
| `/products/` | 许愿开发 / Vibe Coding | `products/index.html` |
| `/products/restory/`、`/products/filmcut/` | 产品介绍与交互演示 | `products/名称/index.html` |

中文是默认语言；同一组页面也有 `/en/` 和 `/id/` 前缀，分别对应英语和印尼语。例如 `/en/annual/2025/` 与 `/id/film/`。每页的语言切换会保留当前文章章节或影集的筛选、页码和照片。各语言页面有独立标题、说明、正文与搜索引擎语言标记，照片文件由三个版本共用。

原网站的 2025 全文、脚本、样式和 `assets/` 已保留在本仓库；从旧文章导入的 2021、2023、2024 年终总结也已经收录。2023 篇是当年提前写的版本，现有导出资料里没有 2022 篇。以后只在这里修改和发布。旧首页的章节书签会转到 `/annual/2025/`。

## 更新内容

- **更新 2021、2023、2024 篇：**编辑 `annual/archive-data/` 中相应年份的资料，中文原文与英语、印尼语译文写在一起；图片放在 `assets/annual/年份/`。运行 `npm run sync:annual` 会重新生成三语正文与年度目录。导入时只使用年度文章及其配图，不收录订阅者数据；2021 年一张显示真实姓名的截图也未公开。
- **新增年度盘点：**可按历史文章的数据结构添加年份，再更新 `scripts/render-annual.js` 的年份列表；也可像 2025 篇一样建立独立的三语 HTML 页面。文章可以混排文字、照片和带 `controls` 的视频，有对白的视频应提供字幕。保持三个版本的章节 `id` 一致，语言切换才能停留在同一段。
- **新增胶片照片：**将网页尺寸的大图与缩略图分别放到 `film/assets/full/胶片卷/` 和 `film/assets/thumb/胶片卷/`，在 `film/gallery-data.js` 追加同格式记录，再运行 `npm run sync:film` 生成三个语言版本可直接显示的照片页面。照片数量、卷数、筛选项和分页会自动更新。仓库不存原始扫描文件。
- **更新产品介绍：**在 `scripts/render-products.js` 同时编辑中文、英语、印尼语文案，再运行 `npm run sync:products`。交互演示由 `products/demo.js` 与 `products/products.css` 实现；示例画面使用已公开照片或合成界面，不包含私人 Instagram 归档。产品 Logo 放在 `assets/products/`。新增产品时也要把它加入三个语言的首页与导航。

运行需要 Node.js 18 或更新版本：

```sh
npm run dev
```

`npm run check` 检查脚本语法、照片编号和文件是否齐全。服务使用 `PORT` 环境变量，未设置时监听 3000 端口。

推送到 `main` 后，GitHub Actions 先检查代码，再自动发布到 Railway 的生产环境；也可以在 Actions 页面手动运行 `Publish Maloe`。设计方向和页面规范见 [DESIGN.md](DESIGN.md)。

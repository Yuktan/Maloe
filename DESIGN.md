# 陆肆捌 / Maloe. 设计方向

陆肆捌是博客的中文名，Maloe. 是英文名和公开网络署名。页面、分享摘要、图片和文档只使用这两个名称，不展示真实姓名。三个栏目是年度盘点、胶片影集和许愿开发（英语、印尼语为 Vibe Coding）。

## 结构

```text
首页 /                     介绍与三条内容线
├─ 年度盘点 /annual/       每年一篇的目录
│  ├─ 2025 /annual/2025/   长篇正文，可混排照片、视频
│  ├─ 2024 /annual/2024/   旧文归档，三语全文
│  ├─ 2023 /annual/2023/   提前版年终总结，三语全文
│  └─ 2021 /annual/2021/   旧文归档，三语全文
├─ 胶片影集 /film/         持续更新，按胶片卷筛选与分页
└─ 许愿开发 /products/     RE:Story、Filmcut 与后续作品
   ├─ RE:Story /products/restory/  年度影像产品介绍与演示
   └─ Filmcut /products/filmcut/   胶片整理工具介绍与演示
```

中文路径作为默认入口，英语和印尼语分别使用 `/en/`、`/id/` 前缀，保持以上各类页面一一对应。顶栏使用简洁的「中 / EN / ID」切换，切换后停留在同一篇内容；窄屏时导航独占一行，避免语言控件挤压标题。历史长文使用固定目录和章节锚点，年份目录按时间倒序排列。译文保留作者说话时的轻松、自嘲与思考，用日常语言表达，不逐字照搬中文句式。

## 视觉语言

- **颜色：**冷纸色 `#edf1f0`、照片白边 `#fafbf9`、深蓝灰文字 `#203337`、次级文字 `#596b6c`、分隔线 `#cbd4d2`、少量选片红 `#a64d58`。这组颜色取自胶片中的蓝天、纸边与红色标签，避免整站变成通用暖米色模板。
- **字体：**全站以 Songti SC / Iowan Old Style 作标题衬线组合，以 PingFang SC / Avenir Next 作正文和界面文字。旧页面的等宽标签也统一到这套无衬线字族。正文保持宽松行距与适中的行宽。
- **版式：**首页左边是文字，右边放一张胶片照片；年度目录以年份排序；胶片影集保留照片矩阵。产品页沿用冷纸色，先展示用途，再呈现三步交互演示与产品 Logo。全站使用同一套字体、颜色、内容宽度和顶栏。
- **互动：**导航状态清晰，筛选和分页保留在网址中，大图支持键盘。自动出现的装饰动效保持克制；小屏幕仍可完整阅读。

设计时参考 [Anthropic Frontend Design](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) 的内容驱动与明确视觉观点，并用 [Vercel Web Interface Guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) 检查可访问性与交互细节。

产品介绍页参考 [Things 的功能页](https://culturedcode.com/things/features/) 的分步演示、[Linear 首页](https://linear.app/) 的界面展示与简洁分层、[Raycast 首页](https://www.raycast.com/) 的用途说明。本站的演示采用轻量 CSS/JavaScript，支持手动切换、暂停与系统减少动态效果设置。示例界面标明为网页演示，不冒充应用截图，也不公开私人归档。

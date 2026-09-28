# Maloe 设计方向

Maloe 是鱼蛋的个人博客。它的主要工作是让读者在「每年的回望」和「随时发生的胶片记录」之间自然移动。首页是入口，不再由某一篇年度文章充当整个网站。

## 结构

```text
首页 /                     介绍与两条内容线
├─ 年度盘点 /annual/       每年一篇的目录
│  └─ 2025 /annual/2025/   长篇正文，可混排照片、视频
└─ 胶片影集 /film/         持续更新，按胶片卷筛选与分页
```

中文路径作为默认入口，英语和印尼语分别使用 `/en/`、`/id/` 前缀，保持以上四类页面一一对应。顶栏使用简洁的「中 / EN / ID」切换，切换后停留在同一篇内容；窄屏时导航独占一行，避免语言控件挤压标题。

## 视觉语言

- **颜色：**冷纸色 `#edf1f0`、照片白边 `#fafbf9`、深蓝灰文字 `#203337`、次级文字 `#596b6c`、分隔线 `#cbd4d2`、少量选片红 `#a64d58`。这组颜色取自胶片中的蓝天、纸边与红色标签，避免整站变成通用暖米色模板。
- **字体：**中文长文与大标题使用 Songti SC / Iowan Old Style 的衬线组合，导航和界面文字使用 PingFang SC / Avenir Next。正文保持宽松行距，避免太长的行宽。
- **版式：**首页左边是文字，右边只放一张胶片照片；年度目录用年份建立真实顺序；胶片影集保留接触印样的照片矩阵。两条内容线都通过相同的顶栏进入。
- **互动：**导航状态清晰，筛选和分页保留在网址中，大图支持键盘。自动出现的装饰动效保持克制；小屏幕仍可完整阅读。

设计时参考 [Anthropic Frontend Design](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) 的内容驱动与明确视觉观点，并用 [Vercel Web Interface Guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) 检查可访问性与交互细节。

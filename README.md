<div align="center">

# 📝 AI Markdown Editor

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/gitstq/ai-markdown-editor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

**AI 驱动的现代化 Markdown 编辑器**

[简体中文](#) | [English](#english) | [繁體中文](#繁體中文)

</div>

---

## 🎉 项目介绍

AI Markdown Editor 是一款专为创作者设计的现代化 Markdown 编辑器，集成了 **GLM-5.1 AI 大模型**，让写作更加智能高效。无论是技术文档、博客文章还是笔记整理，都能获得 AI 的实时辅助。

### 为什么选择 AI Markdown Editor？

- 🚀 **开箱即用** - 无需复杂配置，安装即可使用
- 🤖 **原生 AI 集成** - 深度集成 GLM-5.1，支持续写、润色、翻译
- 🎨 **精美界面** - 基于 Tailwind CSS 的现代化设计
- ⚡ **轻量快速** - 基于 Vite 构建，启动速度快

---

## ✨ 核心特性

| 特性 | 描述 | 状态 |
|------|------|------|
| 🖊️ **实时预览** | 左右分栏编辑，即时渲染 Markdown | ✅ |
| 🤖 **AI 续写** | 根据上下文智能续写文章 | ✅ |
| ✨ **AI 润色** | 一键优化文本表达 | ✅ |
| 🌐 **AI 翻译** | 支持中英文互译 | ✅ |
| 📐 **智能格式化** | 一键美化 Markdown 结构 | ✅ |
| 🌙 **多主题** | 亮色 / 暗色 / 专注模式 | ✅ |
| 📤 **导出功能** | 支持 HTML 导出 | ✅ |
| 🎯 **专注模式** | 沉浸式写作体验 | ✅ |
| 📑 **文档大纲** | 自动生成标题导航 | ✅ |
| 🧮 **数学公式** | 支持 LaTeX 公式渲染 | ✅ |
| 💻 **代码高亮** | 支持 100+ 编程语言 | ✅ |

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/gitstq/ai-markdown-editor.git

# 进入项目目录
cd ai-markdown-editor

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建生产版本

```bash
# 构建 Web 版本
npm run build

# 构建 Electron 桌面应用
npm run electron:build
```

---

## 📖 详细使用指南

### AI 功能配置

1. 点击左侧边栏的 **AI** 标签
2. 点击设置图标，输入你的 GLM API Key
3. 选择模型（默认 GLM-5.1）

### 使用 AI 辅助写作

1. **续写**: 在编辑器中输入内容，点击"续写"按钮
2. **润色**: 选中文字，点击"润色"按钮
3. **翻译**: 选中文字，选择"转英文"或"转中文"
4. **格式化**: 点击"格式化"美化 Markdown 结构

### 视图模式切换

- **编辑模式**: 仅显示编辑器
- **预览模式**: 仅显示预览
- **分栏模式**: 左右分栏（默认）

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + B` | 粗体 |
| `Ctrl/Cmd + I` | 斜体 |
| `Ctrl/Cmd + K` | 插入链接 |
| `Ctrl/Cmd + Shift + C` | 代码块 |

---

## 💡 设计思路与迭代规划

### 技术架构

```
ai-markdown-editor/
├── src/
│   ├── components/     # React 组件
│   ├── hooks/         # 自定义 Hooks
│   ├── stores/        # Zustand 状态管理
│   ├── types/         # TypeScript 类型定义
│   └── lib/           # 工具函数
├── electron/          # Electron 主进程
└── dist/             # 构建输出
```

### 迭代路线图

- [x] v1.0.0 - 基础编辑 + AI 辅助
- [ ] v1.1.0 - 文件管理 + 本地存储
- [ ] v1.2.0 - PDF/Word 导出
- [ ] v1.3.0 - 思维导图视图
- [ ] v1.4.0 - 插件系统
- [ ] v2.0.0 - 协作编辑

---

## 📦 打包与部署指南

### Web 版本

```bash
npm run build
# 输出到 dist/ 目录
```

### Electron 桌面应用

```bash
# Windows
npm run electron:build:win

# macOS
npm run electron:build:mac

# Linux
npm run electron:build:linux
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 提交规范

- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `style:` 代码格式
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具

---

## 📄 开源协议

本项目基于 [MIT](LICENSE) 协议开源。

---

<div align="center">

Made with ❤️ by [gitstq](https://github.com/gitstq)

</div>

---

## English

### Introduction

AI Markdown Editor is a modern Markdown editor powered by GLM-5.1 AI, designed for creators who want intelligent writing assistance.

### Features

- Real-time preview with split view
- AI-powered writing assistance (continue, polish, translate)
- Multiple themes (Light, Dark, Focus)
- Export to HTML
- LaTeX math support
- Code highlighting for 100+ languages

### Quick Start

```bash
git clone https://github.com/gitstq/ai-markdown-editor.git
cd ai-markdown-editor
npm install
npm run dev
```

---

## 繁體中文

### 專案介紹

AI Markdown Editor 是一款整合 GLM-5.1 AI 大模型的現代化 Markdown 編輯器，讓寫作更智能高效。

### 核心功能

- 即時預覽與分欄編輯
- AI 續寫、潤色、翻譯
- 多主題切換
- HTML 匯出
- LaTeX 數學公式支援

### 快速開始

```bash
git clone https://github.com/gitstq/ai-markdown-editor.git
cd ai-markdown-editor
npm install
npm run dev
```

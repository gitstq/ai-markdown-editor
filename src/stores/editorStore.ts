import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ViewMode, SidebarTab, AIConfig } from '@/types'

interface EditorStore {
  // Editor State
  content: string
  setContent: (content: string) => void
  cursorPosition: number
  setCursorPosition: (pos: number) => void
  isDirty: boolean
  setIsDirty: (dirty: boolean) => void

  // View State
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  sidebarTab: SidebarTab
  setSidebarTab: (tab: SidebarTab) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  focusMode: boolean
  setFocusMode: (focus: boolean) => void

  // Theme
  isDark: boolean
  toggleTheme: () => void

  // AI Config
  aiConfig: AIConfig
  setAIConfig: (config: Partial<AIConfig>) => void

  // Recent Files
  recentFiles: string[]
  addRecentFile: (path: string) => void

  // Current File
  currentFile: string | null
  setCurrentFile: (path: string | null) => void
}

const defaultContent = `# 欢迎使用 AI Markdown Editor

> 一款 AI 驱动的现代化 Markdown 编辑器

## ✨ 核心特性

- **实时预览** - 左右分栏，即时渲染
- **AI 辅助写作** - 智能续写、润色、翻译
- **思维导图** - Markdown 一键转思维导图
- **多主题** - 亮色 / 暗色 / 专注模式

## 🚀 快速开始

1. 在左侧编辑器输入 Markdown
2. 右侧实时预览渲染效果
3. 点击 AI 助手获取写作建议

## 📝 语法示例

**粗体文本** 和 *斜体文本*

\`\`\`javascript
console.log('Hello, AI Markdown Editor!');
\`\`\`

| 功能 | 状态 |
|------|------|
| 实时预览 | ✅ |
| AI 辅助 | ✅ |
| 导出 PDF | ✅ |

> 开始你的创作之旅吧！
`

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      content: defaultContent,
      setContent: (content) => set({ content, isDirty: true }),
      cursorPosition: 0,
      setCursorPosition: (pos) => set({ cursorPosition: pos }),
      isDirty: false,
      setIsDirty: (dirty) => set({ isDirty: dirty }),

      viewMode: 'split',
      setViewMode: (mode) => set({ viewMode: mode }),
      sidebarTab: 'files',
      setSidebarTab: (tab) => set({ sidebarTab: tab }),
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      focusMode: false,
      setFocusMode: (focus) => set({ focusMode: focus }),

      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

      aiConfig: {
        apiKey: '',
        apiUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        model: 'glm-5.1',
        temperature: 0.7,
        maxTokens: 2048,
      },
      setAIConfig: (config) =>
        set((state) => ({ aiConfig: { ...state.aiConfig, ...config } })),

      recentFiles: [],
      addRecentFile: (path) =>
        set((state) => ({
          recentFiles: [path, ...state.recentFiles.filter((f) => f !== path)].slice(0, 10),
        })),

      currentFile: null,
      setCurrentFile: (path) => set({ currentFile: path }),
    }),
    {
      name: 'ai-markdown-editor-storage',
      partialize: (state) => ({
        isDark: state.isDark,
        aiConfig: state.aiConfig,
        recentFiles: state.recentFiles,
        viewMode: state.viewMode,
      }),
    }
  )
)

import React from 'react'
import { useEditorStore } from '@/stores/editorStore'
import { cn, downloadFile } from '@/lib/utils'
import {
  Eye,
  Edit3,
  Columns,
  Moon,
  Sun,
  Focus,
  Download,
  FilePlus,
} from 'lucide-react'
import type { ViewMode } from '@/types'

export const Toolbar: React.FC = () => {
  const viewMode = useEditorStore((state) => state.viewMode)
  const setViewMode = useEditorStore((state) => state.setViewMode)
  const isDark = useEditorStore((state) => state.isDark)
  const toggleTheme = useEditorStore((state) => state.toggleTheme)
  const focusMode = useEditorStore((state) => state.focusMode)
  const setFocusMode = useEditorStore((state) => state.setFocusMode)
  const content = useEditorStore((state) => state.content)
  const setContent = useEditorStore((state) => state.setContent)
  const sidebarOpen = useEditorStore((state) => state.sidebarOpen)
  const setSidebarOpen = useEditorStore((state) => state.setSidebarOpen)

  const viewModes: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
    { id: 'edit', icon: <Edit3 size={16} />, label: '编辑' },
    { id: 'preview', icon: <Eye size={16} />, label: '预览' },
    { id: 'split', icon: <Columns size={16} />, label: '分栏' },
  ]

  const handleExportHTML = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Exported Document</title>
<style>
body { max-width: 800px; margin: 0 auto; padding: 40px; font-family: system-ui, sans-serif; line-height: 1.6; }
pre { background: #f4f4f4; padding: 16px; border-radius: 8px; overflow-x: auto; }
code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
blockquote { border-left: 4px solid #ddd; padding-left: 16px; margin-left: 0; color: #666; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background: #f4f4f4; }
img { max-width: 100%; border-radius: 8px; }
</style>
</head>
<body>
${content}
</body>
</html>`
    downloadFile(html, 'document.html', 'text/html')
  }

  const handleNewFile = () => {
    if (confirm('确定要新建文件吗？未保存的内容将丢失。')) {
      setContent('# 未命名文档\n\n开始写作...')
    }
  }

  return (
    <div className="toolbar flex items-center justify-between px-4 py-2 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <button
          onClick={handleNewFile}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent text-sm"
        >
          <FilePlus size={16} />
          <span>新建</span>
        </button>

        <div className="h-4 w-px bg-border mx-1" />

        {viewModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors',
              viewMode === mode.id
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-accent text-muted-foreground'
            )}
          >
            {mode.icon}
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground"
          title="切换侧边栏"
        >
          <Columns size={16} />
        </button>

        <button
          onClick={() => setFocusMode(!focusMode)}
          className={cn(
            'p-2 rounded-md text-sm transition-colors',
            focusMode ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-muted-foreground'
          )}
          title="专注模式"
        >
          <Focus size={16} />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground"
          title="切换主题"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div className="h-4 w-px bg-border mx-1" />

        <button
          onClick={handleExportHTML}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent text-sm text-muted-foreground"
        >
          <Download size={16} />
          <span>导出</span>
        </button>
      </div>
    </div>
  )
}
